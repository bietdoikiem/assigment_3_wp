
var express = require('express')
var router = express.Router()

var mongoose = require('mongoose')
var bodyParser = require('body-parser')
// Routing part
var CourseSchema = require('../schemas/Courses').schema
var StudentSchema = require('../schemas/Students').schema

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
    Project.create(req.body, function(err, project){
        res.send(project)
    })
})

module.exports = router
