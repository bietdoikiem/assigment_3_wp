var express = require('express')
var router = express.Router()

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

router.post('/', function(req,res){
    if(req.body.id){
    Student.create(req.body, function(err, student){
        res.send(student)
    })
}
})

router.delete('/:id', function(req, res){
    Student.deleteOne({id: req.params.id}, function(err, result){
        res.send(result)
    })
})


router.put('/', function(req, res){
    Student.findOneAndUpdate({id: req.body.id},{ name: req.body.name}, function(err, result){
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
 

module.exports = router;


