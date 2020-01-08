var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken')

var mongoose = require('mongoose')
var bodyParser = require('body-parser')
mongoose.set('useFindAndModify', false);


mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });
router.use(bodyParser.json())

const AdminSchema =new mongoose.Schema({
    id: String,
    username: String,
    password: String,
    token: String,
})

var Admin = mongoose.model('admins', AdminSchema)


router.get('/', function(req, res){
    Admin.find({}, function(err, admins){
        if (err) handleError(err)
        res.send(admins)
    })
    
})

router.post('/login', function(req, res){
    Admin.findOne({username: req.body.username}, function(err, admin){
        if(admin){
            if (req.body.password === admin.password){
                res.json({
                    'result': 'authenticated',
                    'token': admin.token
                })
            }else{
                res.json({'result': 'invalid password'})
            }
        }else{
            res.json({'result': 'invalid username'})
        }
    })
})

router.post('/', verifyToken, function(req, res){

    Admin.find({}, function(err, admins){
        if(err) handleError(err)
        Admin.findOne({username: req.body.username}, function(err, admin){
        if (!admin){
            var admin = {
                username: req.body.username
            }
            // set token and store it
            jwt.sign({admin}, 'secretkey', function(err, token){
            Admin.create({
                id: handleID(admins),
                username: req.body.username,
                password: req.body.password,
                token: token
            }, function (err, admin) {
                if (err) handleError(err)
                res.send(admin)
            })
            })
        }else{
            res.send({"result":"username taken"})
        }
        })
    })

})
router.delete('/:id', function(req, res){
    Admin.deleteOne({id: req.params.id}, function(err, result){
        if(err) handleError(err)
        res.send(result)
    })
})


function handleError(err){
    console.log(err)
}

function handleID(res){
    var length = res.length
    if (length == 0 ){
        return "1"
    }
    else{
    var last_item = res[length-1].id
    last_item = parseInt(last_item, 10)
    last_item += 1;
    last_item = last_item.toString(10);
    return last_item
    }
}

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
}

module.exports = router;
