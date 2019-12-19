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

router.post('/', function(req,res){
    Course.create(req.body, function(err, course){
        res.send(course)
    })
})

router.delete('/:id', function(req, res){
    Course.deleteOne({id: req.params.id}, function(err, result){
        res.send(result)
    })
})

router.put('/', function(req, res){
    Course.findOneAndUpdate({id: req.body.id},{ name: req.body.name}, function(err, result){
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

router.get('/search', function (req, res) {
    Course.find(
        { name: { $regex: req.query.name} },
        function (err, courses) {
            if(err) handleError(err)
            res.send(courses)
        }).sort({name: 1})
 })
 

function handleError(err){
    console.log(err)
 }


module.exports = router;


