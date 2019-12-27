var express = require('express')
var router = express.Router()
var sharp = require('sharp')
var fs = require('fs')
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/courses/')
    },
    filename: function(req, file, cb){
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1])
    }
})

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
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

router.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true, useUnifiedTopology: true });
var Course = require('../schemas/Courses')
var CourseSchema = require('../schemas/Courses').schema


router.get('/about', function(req,res){
    res.send('About Courses')
})

router.get('/',function(req,res){
    Course.find({}, function(err, courses){
        res.send(courses)
    })
})

router.get('/:id',function(req,res){
    Course.findOne({id: req.params.id.toUpperCase()}, function(err, course){
        if (course) {
        res.send(course)
        }
        else {
            res.send("Not found")
        }
    })
})

router.post('/', upload.single('Course_Photo') , function(req,res){
    if(req.body.id){
    var path = "/" + req.file.path.split("\\").join("/")
    console.log(req.file);
    sharp(req.file.path).resize(262, 146).toFile('./uploads/courses/' + '262x146-' + req.file.filename , function(err) {
        if (err) {
            console.error('sharp>>>', err)
        }
        console.log('Resize successfully')
        fs.unlinkSync('.'+path)
        });
        console.log(path)
    Course.create({
        id: req.body.id.toUpperCase(),
        name: req.body.name,
        Course_Photo: path.replace(req.file.filename, '262x146-' + req.file.filename)
    }, function(err, course){
        res.send(course)
    })
    }
})

router.delete('/:id', function(req, res){
    Course.deleteOne({id: req.params.id.toUpperCase()}, function(err, result){
        res.send(result)
    })
})

router.put('/:id', upload.single('Course_Photo') , function(req, res){
    if(req.file){
    var path = "/" + req.file.path.split("\\").join("/")
    console.log(req.file);
    sharp(req.file.path).resize(262, 146).toFile('./uploads/courses/' + '262x146-' + req.file.filename , function(err) {
        if (err) {
            console.error('sharp>>>', err)
        }
        console.log('Resize successfully')
        fs.unlinkSync('.'+path)
        });
        console.log(path)
    Course.findOneAndUpdate({id: req.params.id.toUpperCase()},{
        name: req.body.name,
        Course_Photo: path.replace(req.file.filename, '262x146-' + req.file.filename)
    }, 
        function(err, result){
        res.send(result)
    })
    }
    else{
        Course.findOneAndUpdate({id: req.params.id.toUpperCase()},{
            name: req.body.name
        }, 
            function(err, result){
            res.send(result)
        })

    }
 }) 

/* router.get('/search/:keyword',function(req,res){
    Course.find({
                    name: {$regex: req.params.keyword, $options: 'i'},
                    id: {$}
                }, function(err, result){
                    res.send(result)
    })
}) */

router.get('/all/filter', function (req, res) {
    Course.find(
        { name: { $regex: req.query.name, $options :'i'} },
        function (err, courses) {
            if(err) handleError(err)
            res.send(courses)
        }).sort({name: 1})
 })
 

function handleError(err){
    console.log(err)
 }


module.exports = router;
