var express = require('express'),
    router  = express.Router(),
    User    = require('../models/user.js');

// routes

//SIGN UP
router.get('/new', function(req, res){
  res.render('users/new');
});

router.post('/', function (req, res){
  var newUser = User(req.body.user);
  console.log(newUser);
  newUser.save(function (err, user){
    res.redirect(301,"/users/" + user._id)
  });
});

//LOGIN
router.get('/login', function (req, res){
  res.render('users/login');
});

router.post('/login', function(req, res){
  var attempt = req.body.user;

  User.findOne({ email: attempt.email }, function(err, user) {
    var message;

    if( user && user.password == attempt.password ) {
        req.session.currentUser = user.email;

        res.redirect(302, '/users/welcome');
    } else {
        res.redirect(302, '/users/login');
    };
  });
});

//WELCOME
router.get('/welcome', function(req, res){
  if( req.session.currentUser ){
    res.render('users/welcome');
  }else{
    res.redirect(302,'/users/login')
  };
});

//export router object
module.exports = router;
