var express = require('express');
var router = express.Router();

var mongoose = require('mongoose')
var bodyParser = require('body-parser')
mongoose.set('useFindAndModify', false);


mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });
router.use(bodyParser.json())

const AdminSchema =new mongoose.Schema({
    id: String,
    username: String,
    password: String,
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
                res.send({'result': 'authenticated'})
            }else{
                res.send({'result': 'invalid password'})
            }
        }else{
            res.send({'result': 'invalid username'})
        }
    })

})

router.post('/', function(req, res){
    Admin.find({}, function(err, admins){
        if(err) handleError(err)
        Admin.findOne({username: req.body.username}, function(err, admin){
        if (!admin){
            Admin.create({
                id: handleID(admins),
                username: req.body.username,
                password: req.body.password
            }, function (err, admin) {
                if (err) handleError(err)
                res.send(admin)
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

module.exports = router;
