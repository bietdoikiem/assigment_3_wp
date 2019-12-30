
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
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

var upload = multer({
    storage: storage, limits:{
    fileSize: 1024 * 1024 * 16
    },
    fileFilter: fileFilter
});




var mongoose = require('mongoose')
var bodyParser = require('body-parser')
// Routing part
var CourseSchema = require('../schemas/Courses').schema
var StudentSchema = require('../schemas/Students').schema
var Student = require('../schemas/Students')
var Course = require('../schemas/Courses')

router.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true, useUnifiedTopology: true });

const ProjectSchema =new mongoose.Schema({
    id: String,
    name: String,
    student: StudentSchema,
    course: CourseSchema,
    semester: String,
    assignment: String,
    technology: String,
    scope: String,
    description: String,
    industry: String,
    application: String,
    Photo: {type: Array, default: [], required: true, default: "./uploads/projects/Photo-1577492549772.png"}
});

var Project = mongoose.model('projects', ProjectSchema)
var Student = mongoose.model('students', StudentSchema)
var Course = mongoose.model('courses', CourseSchema)




router.get('/', function (req, res) {
    Project.find({}, function (err, projects) {
        res.send(projects)
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

router.get('/byCourse/:id', function(req,res){
    Project.find({'course.id': req.params.id.toUpperCase()}, function(err, projects){
        if(projects.length > 0){
            res.send(projects)
        }
        else{
            res.send("Not found")
        }
    })
})

router.get('/byStudent/:id', function(req,res){
    Project.find({'student.id': req.params.id.toLowerCase()}, function(err, projects){
        if(projects.length > 0){
            res.send(projects)
        }
        else{
            res.send("Not found")
        }
    })
})

router.post('/', upload.array('Photo'), function(req,res){
    console.log(req.files);
    if (req.files){
    var paths = req.files.map(file => {path = "/" + file.path.split("\\").join("/");
                                        return path})
    console.log(paths)
    }
    if (req.body.id){
        Student.find({id: req.body.student.id}, "-_id", function(err, student){
            if (err){
                console.log(err)
            }
            else if (student.length == 0){
                res.send('Student was not FOUND !')
            }
            else{
                Course.find({id: req.body.course.id.toUpperCase()}, function(err, course){
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
                    assignment: req.body.assignment,
                    technology: req.body.technology,
                    scope: req.body.scope,
                    description: req.body.description,
                    industry: req.body.industry,
                    application: req.body.application,
                    Photo: paths
                }, function(err, project){
                    if(err) handleError(err)
                    res.send(project)
                })
            })
            }
        })
    }
    else{
        Student.find({id: req.body.student.id}, "-_id", function(err, student){
            if (err){
                console.log(err)
            }
            else if (student.length == 0){
                res.send('Student was not FOUND !')
            }
            else{
                Course.find({id: req.body.course.id.toUpperCase()}, function(err, course){
                Project.find({}, "-_id", function(err, projects){
                Project.create({
                    id: handleID(projects),
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
                    assignment: req.body.assignment,
                    technology: req.body.technology,
                    scope: req.body.scope,
                    description: req.body.description,
                    industry: req.body.industry,
                    application: req.body.application,
                    Photo: paths
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

router.delete('/:id', function(req, res){
    Project.deleteOne({id: req.params.id}, function(err, result){
        if (err) handleError(err)
        res.send(result)
    })
})


router.put('/:id', upload.array('Photo'), function(req, res){
    console.log(req.files);
    if(req.file){
        Course.findOne({id: req.params.id.toUpperCase()}, function(err, course){
            if(err) handleError(err)
            fs.unlinkSync('.'+course.Course_Photo)
        } )
        var path = "/" + req.file.path.split("\\").join("/")
        console.log(req.file);
        sharp(req.file.path).resize(262, 146).toFile('./uploads/courses/' + '262x146-' + req.file.filename , function(err) {
            if (err) {
                console.error('sharp>>>', err)
            }
            console.log('Resize successfully')
            fs.unlinkSync('./'+path)
            });
            console.log(path)
    Student.find({id: req.body.student.id}, "-_id", function(err, student){
        if (err){
            console.log(err)
        }
        else if (student.length == 0){
            res.send('Student was not FOUND !')
        }
        else{
    Project.findOneAndUpdate({id: req.params.id},{
        name: req.body.name,
        student: {
            _id: req.body._id,
            id: student[0].id,
            name: student[0].name,
            year: student[0].year
        },
        course: {
            id: req.body.course.id,
            name: req.body.course.name
        },
        assignment: req.body.assignment,
        technology: req.body.assignment,
        scope: req.body.scope,
        description: req.body.description,
        industry: req.body.industry,
        application: req.body.application,
        Photo: req.body.Photo
    }, function(err, result){
        res.send(result)
    })
    }
 })
    }
})
 

/* router.get('/search/:keyword',function(req,res){
    Student.find({
                    name: {$regex: req.params.keyword, $options: 'i'},
                    id: {$}

                }, function(err, result){
                    res.send(result)
    })
}) */

router.get('/all/filter', function (req, res) {
    Project.find(
        { name: { $regex: req.query.name, $options :'i'} },
        function (err, projects) {
            if(err) handleError(err)
            res.send(projects)
        }).sort({name: 1})
 })
 

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
