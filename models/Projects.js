
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

router.post('/', function(req,res){
    if (req.body.id){
        Student.find({id: req.body.student.id}, "-_id", function(err, student){
            if (err){
                console.log(err)
            }
            else if (student.length == 0){
                res.send('Student was not FOUND !')
            }
            else{
                Project.create({
                    id: req.body.id,
                    name: req.body.name,
                    student: {
                        _id: req.body._id,
                        id: student[0].id,
                        name: student[0].name
                    },
                    course: {
                        id: req.body.course.id,
                        name: req.body.course.name
                    },
                    assigment: req.body.assigment,
                    technology: req.body.assigment,
                    scope: req.body.scope,
                    description: req.body.description,
                    industry: req.body.industry,
                    application: req.body.application,
                    Photo: req.body.Photo
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



module.exports = router
