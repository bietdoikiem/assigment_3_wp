var app = require('express')()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });

var StudentSchema = new mongoose.Schema({
    id: String,
    name: String
})

var Student = mongoose.model('students', StudentSchema)

app.get('/students', function(req,res){
    Student.find({}, function(err, students){
        res.send(students)
    })
})

app.post('/students', function(req,res){
    Student.create(req.body, function(err,student){
        res.send(student)
    })
})

app.listen(5000)