var express = require('express');
var router = express.Router();


var User = require('../models/user');


//REGISTER USER

router.post('/register', function(req, res, next) {
  User.register(req.body, function(err, savedUser) {
    if(err){
      res.status(400).send(err)
    } else{
      res.send('register success!');
    }
  });
});

//LOGIN USER

router.post('/login', function(req, res, next){
  console.log('XXXXXXXXXXX',req.body);
  User.login(req.body, function(err, token){
    if(err) {
      res.status(400).send(err);
    }
    else{
      console.log(token);
      // this is where we need to res.send the token object, angular will then store in auth svc to send in headers in future require
      res.send(token);
    }
  });
});



// IS USER LOGGED IN

router.get('/auth', User.isLoggedIn, function(req, res, next){
  res.send('Valid Login State!');
});


router.get('/logout', User.isLoggedIn, function(req, res){
  res.clearCookie('userToken').send('logout success!');
});



module.exports = router;
