var express = require('express')
var router = express.Router()

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

router.post('/', function(req,res){
    if(req.body.id){
    Course.create({
        id: req.body.id.toUpperCase(),
        name: req.body.name
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

router.put('/:id', function(req, res){
    Course.findOneAndUpdate({id: req.params.id.toUpperCase()},req.body, function(err, result){
        res.send(result)
    })
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


