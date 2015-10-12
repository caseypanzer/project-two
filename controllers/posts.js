var express = require('express'),
    router  = express.Router(),
    Post    = require('../models/post.js');

// routes

//VIEW
router.get('/welcome', function(req, res){
  Post.find({}, function(err, postsArray){
    if(err){
      console.log(err);
    } else {
        res.render("posts/welcome", { posts: postsArray })
    };
  });
});

//New Post
router.get('/new', function(req, res){
  res.render('posts/new');
});

//CREATE
router.post('/', function(req, res){
  var newPost = Post(req.body.post);
  console.log(newPost);

  newPost.save(function (err, post){
      res.redirect(302,"/posts/" + post._id)
  });
});

//VIEW SINGLE RECORD
router.get('/:id', function(req, res){
  var mongoID = req.params.id
  Post.findOne({ _id: req.params.id }, function(err, foundPost){
    if(err){
      console.log(err);
    } else {
        res.render("posts/view", { post: foundPost })
    };
  });
});

//EDIT


//PATCH


//export router object
module.exports = router;
