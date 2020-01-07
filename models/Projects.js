
var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs')
var sharp = require('sharp')

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/projects/')
    },
    filename: function(req, file, cb){
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1])
    }
})

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4' || file.mimetype === 'video/x-flv' || file.mimetype === 'video/x-msvideo' || file.mimetype === 'video/quicktime'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

var upload = multer({
    storage: storage, limits:{
    fileSize: 1024 * 1024 * 200
    },
    fileFilter: fileFilter
});




var mongoose = require('mongoose')
var bodyParser = require('body-parser')
mongoose.set('useFindAndModify', false);
// Routing part
var CourseSchema = require('../schemas/Courses').schema
var StudentSchema = require('../schemas/Students').schema
var Student = require('../schemas/Students')
var Course = require('../schemas/Courses')

router.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true, useUnifiedTopology: true });

const AssignmentSchema =new mongoose.Schema({
    name: String,
    description: String,
    percentage: String
})


const ProjectSchema =new mongoose.Schema({
    id: String,
    name: String,
    student: StudentSchema,
    course: CourseSchema,
    semester: String,
    assignment: AssignmentSchema,
    technology: String,
    scope: String,
    description: String,
    industry: String,
    application: String,
    Thumbnail: String,
    Photo: {type: Array, default: [], required: false},
    Video: {type: Array, default: [], required: false}
});

var Project = mongoose.model('projects', ProjectSchema)
var Student = mongoose.model('students', StudentSchema)
var Course = mongoose.model('courses', CourseSchema)




router.get('/', function (req, res) {
    var pageNo = parseInt(req.query.pageNo)
    var size = parseInt(req.query.size)
    var query = {}
    if(pageNo <= 0 || pageNo === 0) {
          response = {"error" : true,"message" : "invalid page number, should start with 1"};
          return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    Project.countDocuments({},function(err,totalCount) {
        if(err) {
          response = {"error" : true,"message" : "Error fetching data"}
        }
        Project.find({},{},query, function (err, projects) {
            if(err){
                response = {"error" : true,"message" : "Not found"};
            } else {
                var total = []
                var totalPages = Math.ceil(totalCount / size)
                for(i = 1; i <= totalPages; i++){
                    total.push(i)
                }
                response = {"error" : false, 'data': projects , "pageNo": parseInt(req.query.pageNo), "pages": total};
            }
            res.json(response);
        })
    })
})

router.get('/:id', function (req, res) {
    Project.findOne({id: req.params.id}, function (err, project) {
        if(project){
        res.send(project)
        }
        else{
            res.send("Not found")
        }
    })
})



router.get('/all/filter', function (req, res) {
    if (req.query.cId === '') {
        Project.find({name: { $regex: req.query.name, $options: 'i'} },
            function (err, projects) {
                if (err) handleError(err)
                res.send(projects)
            }).sort({ name: 1 })
    }
    else if(req.query.name === ''){
        Project.find({ 'course.id': req.query.cId.toUpperCase() },
            function (err, projects) {
                if (err) handleError(err)
                res.send(projects)
            }).sort({ name: 1 })
    }
    else if(typeof req.query.name !== 'undefined' && typeof req.query.cId !== 'undefined'){
        Project.find({$and: [
            {name: { $regex: req.query.name, $options: 'i'}},
            {'course.id': req.query.cId.toUpperCase()}
            ]},
            function(err, projects){
                if(err) handleError(err)
                res.send(projects)
            }).sort({name: 1})
    }
 })
 



router.post('/', upload.single('Thumbnail'), function(req,res){
    if (req.file){
    var path = "/" + req.file.path.split("\\").join("/")
    console.log(path)
    }
    if (req.body.id){
        Student.find({id: req.body.studentId}, "-_id", function(err, student){
            if (err){
                console.log(err)
            }
            else if (student.length == 0){
                res.send('Student was not FOUND !')
            }
            else{
                Course.find({id: req.body.courseId.toUpperCase()}, function(err, course){
                Project.create({
                    id: req.body.id,
                    name: req.body.name,
                    student: {
                        _id: req.body._id,
                        id: student[0].id,
                        name: student[0].name,
                        year: student[0].year
                    },
                    course: {
                        id: course[0].id,
                        name: course[0].name
                    },
                    semester: req.body.semester,
                    assignment: {
                        name: req.body.assignmentName,
                        description: req.body.assignmentDescription,
                        percentage: req.body.assignmentPercentage
                    },
                    technology: req.body.technology,
                    scope: req.body.scope,
                    description: req.body.description,
                    industry: req.body.industry,
                    application: req.body.application,
                    Thumbnail: path,
                    Photo: path
                }, function(err, project){
                    if(err) handleError(err)
                    res.send(project)
                })
            })
            }
        })
    }
    else{
        Student.find({id: req.body.studentId}, "-_id", function(err, student){
            if (err){
                console.log(err)
            }
            else if (student.length == 0){
                res.send('Student was not FOUND !')
            }
            else{
                Course.find({id: req.body.courseId.toUpperCase()}, function(err, course){
                Project.find({}, "-_id", function(err, projects){
                Project.create({
                    id: handleID(projects),
                    name: req.body.name,
                    student: {
                        id: student[0].id,
                        name: student[0].name,
                        year: student[0].year
                    },
                    course: {
                        id: course[0].id,
                        name: course[0].name
                    },
                    semester: req.body.semester,
                    assignment: {
                        name: req.body.assignmentName,
                        description: req.body.assignmentDescription,
                        percentage: req.body.assignmentPercentage
                    },
                    technology: req.body.technology,
                    scope: req.body.scope,
                    description: req.body.description,
                    industry: req.body.industry,
                    application: req.body.application,
                    Thumbnail: path,
                    Photo: path
                }, function(err, project){
                    if(err) handleError(err)
                    res.send(project)
                })
                })
            })
            }
        })

    }
})

// PUT method for project details:
router.put('/:id', function(req, res){
    if(req.body.studentId){
    Student.find({id: req.body.studentId}, "-_id", function(err, student){
        if (err){
            console.log(err)
        }
        else if (student.length == 0){
            res.send('Student was not FOUND !')
        }
        else{
        Course.find({id: req.body.courseId.toUpperCase()}, function(err, course){
            if (err) handleError(err);
            Project.findOneAndUpdate({id: req.params.id}, {
                name: req.body.name,
                student: {
                    id: student[0].id,
                    name: student[0].name,
                    year: student[0].year
                },
                course: {
                    id: course[0].id,
                    name: course[0].name
                },
                semester: req.body.semester,
                assignment: {
                    name: req.body.assignmentName,
                    description: req.body.assignmentDescription,
                    percentage: req.body.assignmentPercentage
                },
                technology: req.body.technology,
                scope: req.body.scope,
                description: req.body.description,
                industry: req.body.industry,
                application: req.body.application
            }, function (err, result) {
                    if(err) handleError(err)
                    res.send(result)
                })
        })
        }
    })
    }
 }) 


// Put images to slideshow
router.put('/:id/photos', upload.array('Photo'), function(req, res){
    console.log(req.files)
    if(req.files){
        Project.findOne({id: req.params.id}, function(err, project){
            if(err){ 
                handleError(err)
            }else{
                for(i=0; i < project.Photo.length; i++){
                    if (project.Photo[i].indexOf("/uploads/projects/Thumbnail") !== 0){
                        fs.unlinkSync('.'+project.Photo[i]);
                    }
                }
            }
        })
    var paths = req.files.map(file => {path = "/" + file.path.split("\\").join("/");
    return path})
    console.log(paths)
    Project.findOneAndUpdate({id: req.params.id},{
        Photo: paths
    }, function(err, result){
        if(err) handleError(err)
        res.send(result);
    })
    }
})

// Put videos to showcases
router.put('/:id/videos', upload.array('Video'), function(req, res){
    console.log(req.files)
    if(req.files){
        Project.findOne({id: req.params.id}, function(err, project){
            if(err){ 
                handleError(err)
            }else{
                for(i=0; i < project.Video.length; i++){
                    fs.unlinkSync('.'+project.Video[i]);
                }
            }
        })
    var paths = req.files.map(file => {path = "/" + file.path.split("\\").join("/");
                                        return path})
    console.log(paths)
    
    Project.findOneAndUpdate({id: req.params.id},{
        Video: paths
    }, function(err, result){
        if(err) handleError(err)
        res.send(result);
    })
    }
})

router.delete('/:id', function(req, res){
    Project.deleteOne({id: req.params.id}, function(err, result){
        if (err) handleError(err)
        res.send(result)
    })
})



 

/* router.get('/search/:keyword',function(req,res){
    Student.find({
                    name: {$regex: req.params.keyword, $options: 'i'},
                    id: {$}

                }, function(err, result){
                    res.send(result)
    })
}) */



function handleError(err){
    console.log(err)
}
function handleID(res){
    var length = res.length
    if (length == 0 ){
        return "1"
    }
    else{
    var last_item = res[length-1].id
    last_item = parseInt(last_item, 10)
    last_item += 1;
    last_item = last_item.toString(10);
    return last_item
    }
}



module.exports = router
