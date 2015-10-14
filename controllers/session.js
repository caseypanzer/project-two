var express = require('express'),
    router  = express.Router(),
    User    = require('../models/user.js'),
    Post    = require('../models/post.js');

//WELCOME
router.get('/welcome', function(req, res){
  Post.find({ lastUpdatedBy: req.session.currentUser }, function(err, postsArray){
    if(err){
      console.log(err);
    } else {
        res.render("session/welcome", { posts: postsArray })
    };
  }).sort({ lastUpdated: -1 });
});

//export router object
module.exports = router;
