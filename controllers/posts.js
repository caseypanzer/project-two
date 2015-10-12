var express = require('express'),
    router  = express.Router(),
    Post    = require('../models/post.js');

//VIEW ALL
router.get('/welcome', function(req, res){
  Post.find({}, function(err, postsArray){
    if(err){
      console.log(err);
    } else {
        res.render("posts/welcome", { posts: postsArray })
    };
  });
});

//NEW POST FORM
router.get('/new', function(req, res){
  res.render('posts/new');
});

//CREATE POST
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
router.get('/:id/edit', function(req, res){
  Post.findOne({ _id: req.params.id }, function(err, foundPost){
    if(err){
      console.log(err);
    } else {
        res.render("posts/edit", { post: foundPost })
    };
  });
});

//PATCH
router.patch('/:id', function(req, res){
  var mongoID    = req.params.id;
  var postUpdate = req.body.post;

  Post.update({ _id: mongoID }, postUpdate, function(err, foundPost){
    if(err){
      console.log(err);
    } else {
        res.redirect(302, '/posts/' + mongoID)
    };
  });
});

//DELETE
router.delete('/:id', function(req, res){
  var mongoID = req.params.id
  Post.remove({ _id: req.params.id }, function(err, foundPost){
    if(err){
      console.log(err);
    } else {
        res.redirect(302, "/posts/welcome");
    };
  });
});

//export router object
module.exports = router;
