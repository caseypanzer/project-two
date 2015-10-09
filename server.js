var express  = require('express'),
    PORT     = process.env.PORT || 5432,
    server   = express(),
    MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhoset:27017",
    dbname   = "some_useful_name"
    mongoose = require('mongoose');

server.get('/test', function(req, res){
  res.write('Welcome to my amzing app');
  res.end();
});

mongoose.connect(MONGOURI + "/" + dbname)
server.listen(PORT, function (){
  console.log("server is up on port: " + PORT);
});
