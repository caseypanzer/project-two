var express  = require('express'),
    PORT     = process.env.PORT || 5432,
    server   = express(),
    MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    dbname   = "wiki",
    mongoose = require('mongoose'),
    ejs = require('ejs'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    expressEjsLayouts = require('express-ejs-layouts');

//Initialize Packages
server.set('views', './views');
server.set('view engine','ejs');

server.use(session({
  secret: "caseypanzer",
  resave: true,
  saveUninitialized: false
}));

server.use(express.static('./public'));
server.use(expressEjsLayouts);
server.use(morgan('dev'));

server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(methodOverride('_method'));

server.use(function (req, res, next){
  console.log("--------{start}----------");
  console.log("REQ DOT BODY\n", req.body);
  console.log("REQ DOT PARAMS\n", req.params);
  console.log("REQ DOT SESSIONS\n", req.session);
  console.log("--------{end}----------");
  next();
});

//ROUTES
var userController = require('./controllers/users.js');
server.use('/users', userController)

//middleware to validate login?
//chcek to see if current seeion has a user
//if true redirect to page
//if not redirect to login

server.use(function(req, res, next){
  var user = req.session.currentUser;

  if(user){
    console.log("user logged in");
    next();
  } else {
    res.redirect(302,'/users/login')
  };
});

var postController = require('./controllers/posts.js');
server.use('/posts', postController)

//SERVER STUFF

server.get('/', function(req, res){
  res.write('Welcome to my amzing app');
  res.end();
});

mongoose.connect(MONGOURI + "/" + dbname);
server.listen(PORT, function (){
  console.log("server is up on port: " + PORT);
});
