var express  = require('express'),
    PORT     = process.env.PORT || 5432,
    server   = express(),
    MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    dbname   = "some_useful_name",
    mongoose = require('mongoose'),
    ejs = require('ejs'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    expressEjsLayouts = require('express-ejs-layouts');

//Initialize Packages
server.set('views', ',/views');
server.set('view engine','ejs');

server.use(session({
  secret: "caseypanzer",
  resave: true,
  saveUnitialized: false
}));

server.use(express.static('./public'));
server.use(expressEjsLayouts);
server.use(morgan('dev'));

server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(methodOverride('_method'));

//SERVER STUFF

server.get('/test', function(req, res){
  res.write('Welcome to my amzing app');
  res.end();
});

mongoose.connect(MONGOURI + "/" + dbname)
server.listen(PORT, function (){
  console.log("server is up on port: " + PORT);
});
