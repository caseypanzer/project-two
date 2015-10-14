var express = require('express'),
    router  = express.Router(),
    User    = require('../models/user.js'),
    Post    = require('../models/post.js');;

// routes

//SIGN UP
router.get('/new', function(req, res){
  res.render('users/new');
});

router.post('/', function (req, res){
  //first test that email and reEmail ===
    //if not then tell user they dont match
  //then test that password and rePassword ===
    //if not then tell user they dont match

  //check to see if email is in database [x]
    //if it is redirect to login screen [x]
    //if its not sign up user [x]
  console.log(req.body);
  var newUser = User(req.body.user);
  User.findOne({ email: newUser.email }, function(err, user) {
    if (user) {
      res.redirect(302,"/users/login");
    } else {
      newUser.save(function (err, user){
          res.redirect(302,"/users/" + user._id)
      });
    }
  });
});

//LOGIN -> server.use('/session', sessionController)
router.get('/login', function (req, res){ // get '/new'
  res.render('users/login');
});

router.post('/login', function(req, res){ // post '/'
  var attempt = req.body.user;

  User.findOne({ email: attempt.email }, function(err, user) {
    var message;

    if( user && user.password === attempt.password ) {
        req.session.currentUser = user.email;

        res.redirect(302, '/users/welcome');
    } else {
        res.redirect(302, '/users/login'); // redirect to `/session/new`
    };
  });
});

//WELCOME
router.get('/welcome', function(req, res){
  Post.find({}, function(err, postsArray){
    if(err){
      console.log(err);
    } else {
        res.render("users/welcome", { posts: postsArray })
    };
  });
});

//export router object
module.exports = router;
