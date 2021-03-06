var express = require('express')
var router = express.Router()
var sharp = require('sharp')
var fs = require('fs')
var multer = require('multer');
var jwt= require('jsonwebtoken')

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/students/')
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
var Student = require('../schemas/Students')
var StudentSchema = require('../schemas/Students').schema




router.get('/about', function(req,res){
    res.send('About Students')
})

router.get('/',function(req,res){
    Student.find({}, function(err, students){
        res.send(students)
    })
})

router.get('/:id',function(req,res){
    Student.findOne({id: req.params.id}, function(err, student){
        if (student){
        res.send(student)
        }
        else{
            res.send("Not found")
        }
    })
})

router.post('/', verifyToken,upload.single('Student_Photo') , function(req,res){
    jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(!err){
    if(req.file){
    if(req.body.id){
    var path = "/" + req.file.path.split("\\").join("/")
    console.log(req.file);
    sharp(req.file.path).resize(256, 256).toFile('./uploads/students/' + '256x256-' + req.file.filename , function(err) {
        if (err) {
            console.error('sharp>>>', err)
        }
        console.log('Resize successfully')
        fs.unlinkSync('.'+path)
        });
    console.log(path)
    Student.create({
        id: req.body.id,
        name: req.body.name,
        year: req.body.year,
        Student_Photo: path.replace(req.file.filename, '256x256-' + req.file.filename) // trung` field nay nha a
    }, function(err, student){
        res.send(student)
    })
}
}else{
    Student.create({
        id: req.body.id,
        name: req.body.name,
        year: req.body.year,
    }, function(err, student){
        res.send(student)
    })
    }
    }else{
        res.json({'result': 'not allowed'})
    }
    })
})

router.delete('/:id', verifyToken, function(req, res){
    jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(!err){
    Student.findOne({id: req.params.id}, function(err, student){
        if(err){ handleError(err)}
        else if(student.Student_Photo) {
            if(typeof student.Student_Photo !== 'undefined' && student.Student_Photo !== '' && student.Student_Photo.indexOf('/uploads/students/default_student') === -1){
                fs.unlinkSync('.'+student.Student_Photo);
            }
        }
    })
    Student.deleteOne({id: req.params.id}, function(err, result){
        res.send(result)
    })
    } else{
        res.json({'result': 'not allowed'})
    }
    })
})


router.put('/:id', verifyToken, upload.single('Student_Photo') , function(req, res){
    jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(!err){
    if(req.file){
        Student.findOne({id: req.params.id}, function(err, student){
            if(err) handleError(err)
            fs.unlinkSync('.'+student.Student_Photo)
        } )
    var path = "/" + req.file.path.split("\\").join("/")
    console.log(req.file);
    sharp(req.file.path).resize(256, 256).toFile('./uploads/students/' + '256x256-' + req.file.filename , function(err) {
        if (err) {
            console.error('sharp>>>', err)
        }
        console.log('Resize successfully')
        fs.unlinkSync('.'+path)
        });
        console.log(path)
    Student.findOneAndUpdate({id: req.params.id.toLowerCase()},{
        name: req.body.name,
        year: req.body.year,
        Student_Photo: path.replace(req.file.filename, '256x256-' + req.file.filename)
    }, 
        function(err, result){
        res.send(result)
    })
    }
    else{
        Student.findOneAndUpdate({id: req.params.id.toLowerCase()},{
            name: req.body.name,
            year: req.body.year
        }, 
            function(err, result){
            res.send(result)
        })

    }
    }else{
        res.json({'result': 'not allowed'})
    }
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

router.get('/all/filter', function (req, res) {
    Student.find(
        { name: { $regex: req.query.name,  $options :'i'} },
        function (err, students) {
            if(err) handleError(err)
            res.send(students)
        }).sort({name: 1})
 })
 

function handleError(err){
    console.log(err)
 }
 function verifyToken(req, res, next){
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1]
        // Set the token
        req.token = bearerToken
        // Next middleware
        next();
    } else {
        //forbidden
        res.json({'result': 'not allowed'})
    }
}
 

module.exports = router;


