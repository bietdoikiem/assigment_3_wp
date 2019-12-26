var app = require('express')()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cors = require('cors');
// Routing part
var students = require('./models/Students')
var courses = require('./models/Courses')
var projects = require('./models/Projects')


app.use(bodyParser.json())
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/students', students)
app.use('/courses', courses)
app.use('/projects', projects)
app.listen(5000)