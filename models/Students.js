var express = require('express')
var router = express.Router()

var mongoose = require('mongoose')
var bodyParser = require('body-parser')

router.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true, useUnifiedTopology: true });
var StudentSchema = new mongoose.Schema({
    id: String,
    name: String
})
var Student = mongoose.model('students', StudentSchema)


router.get('/about', function(req,res){
    res.send('About Students')
})

router.get('/',function(req,res){
    Student.find({}, function(err, students){
        res.send(students)
    })
})

router.post('/', function(req,res){
    Student.create(req.body, function(err, student){
        res.send(student)
    })
})

router.delete('/:id', function(req, res){
    Student.deleteOne({id: req.params.id}, function(err, result){
        res.send(result)
    })
})

router.put('/', function(req, res){
    Student.findOneAndUpdate({id: req.body.id},{name: req.body.name}),
    function(err, result){
        res.send(result)
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

router.get('/search', function (req, res) {
    Student.find(
        { name: { $regex: req.query.name } },
        {
            skip:0, // Starting Row
            limit:10, // Ending Row
            sort:{
                name: -1 //Sort by Date Added DESC
            }
        },
        function (err, students) {
            if(err) handleError(err)
            res.send(students)
        })
 })
 

function handleError(err){
    console.log(err)
 }
 

module.exports = router

