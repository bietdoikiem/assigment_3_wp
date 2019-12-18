var app = require('express')()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var students = require('./models/Students')

app.use(bodyParser.json())


mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/students', students)

app.listen(5000)