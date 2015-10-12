var express = require('express'),
    router  = express.Router(),
    User    = require('../models/post.js');

// routes

//New Post
router.get('/new', function(req, res){
  res.render('posts/new');
});


//export router object
module.exports = router;
