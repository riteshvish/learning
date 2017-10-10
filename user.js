var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = require('../app/models/user');

// create a new user called chris
var chris = new User({
  name: 'Chris',
  password: 'password'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// chris.dudify(function(err, name) {
//
//   console.log('Your new name is ' + name);
// });

console.log(chris.dudify());

// call the built-in save method to save to the database
// chris.save(function(err) {
//   if(err){
//
//   }
//   else{
//     console.log('User saved successfully!');
//   }
// });


module.exports = router;
