
var express = require('express')
var router = express.Router()

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
    assigment: String,
    technology: String,
    scope: String,
    description: String,
    industry: String,
    application: String,
    Photo: String
});

var Project = mongoose.model('projects', ProjectSchema)
var Student = mongoose.model('students', StudentSchema)
var Course = mongoose.model('courses', CourseSchema)




router.get('/', function (req, res) {
    Project.find({}, function (err, projects) {
        res.send(projects)
    })
})

router.post('/', function(req,res){
    if (req.body.id){
        Student.find({id: req.body.id}, "-_id", function(err, student){
            if (err){
                console.log(err)
            }
            else if (student.length == 0){
                res.send('Student was not FOUND !')
            }
            else{
                Project.create({

                        // create here



                }, function(err, project){
                    res.send(project)
                })
            }
        })
    }
})

router.delete('/:id', function(req, res){
    Project.deleteOne({id: req.params.id}, function(err, result){
        res.send(result)
    })
})


router.put('/', function(req, res){
    Project.findOneAndUpdate({id: req.body.id},{ name: req.body.name}, function(err, result){
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

router.get('/search', function (req, res) {
    Project.find(
        { name: { $regex: req.query.name} },
        function (err, projects) {
            if(err) handleError(err)
            res.send(projects)
        }).sort({name: 1})
 })
 

function handleError(err){
    console.log(err)
 }
 


module.exports = router
