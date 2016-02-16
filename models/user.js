'use strict';

var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var moment = require('moment');
var dotenv = require('dotenv');
var bcrypt = require('bcrypt-nodejs');

//pull in env variables if local
dotenv.config();

var JWT_SECRET = process.env.JWT_SECRET;


var User;

var userSchema = mongoose.Schema({
  email: { type:String, required: true},
  password: {type: String, required: true},
  name: String,
});


userSchema.pre('save', function(next) {
  if(!this.isNew) return next();
  bcrypt.genSalt(12, (err, salt) => {
    bcrypt.hash(this.password, salt, null, (err, hash) => {
      this.password = hash;
      next();
    });
  });
});



userSchema.statics.register = function(userObj, cb) {

  console.log('userObj: ',userObj)

  if(!userObj.email || !userObj.password || !userObj.password2) {
    return cb('Missing required field!');
  }
  if(userObj.password !== userObj.password2){
    return cb('Passwords do not match!');
  }

  User.findOne({email: userObj.email}, function(err, user){
    if(err || user) return cb(err || 'That email address has an account!');

    User.create(userObj, function(err, savedUser){
      savedUser.password = '';
      cb(err, savedUser);
    });

  });

};





userSchema.statics.login = function(userObj, cb) {
  if(!userObj.email || !userObj.password) {
    return cb('Missing required field!');
  }

  User.findOne({email: userObj.email}, function(err, user) {
    if(err || !user) return cb(err || 'User not found in db.');
    var token = user.generateToken();
    cb(null, token);
  });

};


userSchema.statics.isLoggedIn = function(req, res, next){
  var token = req.cookies.userToken;
  if(!token) res.status(401).send({error: `Authentication failed, no token`});

  try {
    var payload = jwt.decode(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({error: `Authentication failed: ${err}`});
  }

  if(moment().isAfter( moment(payload.iat, 'X').add(1, 'day') )) {
    return res.status(401).send({error: `Authentication failed, expired: ${err}`});
  };

  req.token = payload;

  next();

};


userSchema.methods.generateToken = function() {
  var payload = {
    _id: this._id,
    iat: moment().unix()
  };
  // console.log('the jwt secret: ',JWT_SECRET)
  var token = jwt.encode(payload, JWT_SECRET)
  // console.log('the token: ',token)
  return token;
};


User = mongoose.model('User', userSchema);

module.exports = User;
