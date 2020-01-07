var express = require('express')
var app = express()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cors = require('cors');
// Routing part
var students = require('./models/Students')
var courses = require('./models/Courses')
var projects = require('./models/Projects')


app.use(bodyParser.json())
app.use('/uploads/projects/', express.static('uploads/projects'))
app.use('/uploads/courses/', express.static('uploads/courses'))
app.use('/uploads/students/', express.static('uploads/students'))
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/login', function(req, res){
    var user = req.body
    if(user.username === 'admin' && user.password === 'admin'){
        res.send({'result': 'authenticated'})
    }
    else{
        res.send({'result': 'Unauthenticated'})
    }
})


app.use('/students', students)
app.use('/courses', courses)
app.use('/projects', projects)
app.listen(5000)