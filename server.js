var express = require('express')
var app = express()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cors = require('cors');
var jwt = require('jsonwebtoken')
// Routing part
var students = require('./models/Students')
var courses = require('./models/Courses')
var projects = require('./models/Projects')
var admins = require('./models/Admins')

app.use(bodyParser.json())
app.use('/uploads/projects/', express.static('uploads/projects'))
app.use('/uploads/courses/', express.static('uploads/courses'))
app.use('/uploads/students/', express.static('uploads/students'))
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });


/* app.get('/api', (req, res) => {
    res.json({
        message: "welcome to API"
    })
})

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err){
            res.json({'result': 'not allowed'});
        } else{
            res.json({
                message: "Post created",
                authData
            });
        }
    })
});



app.post('/api/login', (req , res)=>{
    // Mock user
    var user = {
        id: Math.floor(Math.random() * 10),
        username: req.body.username
    }
    if (req.body.username === 'admin'){
    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            token
        })

    })
    } else{
        res.json({'result': 'unauthenticated'})
    }
})

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token Func:
function verifyToken(req, res, next){
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1]
        // Set the token
        req.token = bearerToken
        // Next middleware
        next();
    } else {
        //forbidden
        res.json({'result': 'not allowed'})
    }
} */


app.use('/students', students)
app.use('/courses', courses)
app.use('/projects', projects)
app.use('/admins', admins)
app.listen(5000)