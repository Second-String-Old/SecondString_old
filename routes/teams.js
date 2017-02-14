var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongodbUri = 'mongodb://pledgemaster:skilodge@ds021356.mlab.com:21356/nfldb';
//connecting to database
mongoose.connect(mongodbUri);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.on("open", function(){
  console.log("mongodb is connected!!");
});
/* GET home page. */
router.get('/teams', function(req, res, next) {
  var teamCollec = db.collection('Teams');
  teamCollec.find().toArray(function(err, Teams){
    if(err) {return console.dir(err);}
    res.render('teams.ejs', { title: 'Second String', data: Teams });
    // db.close(function (err){
    //   if(err) throw err;
    // });
  });
});

router.get('/stats', function(req, res, next) {
  res.render('stats.ejs', { title: 'Second String' });
});

router.get('/index', function(req, res, next) {
  res.render('index.ejs', { title: 'Second String' });
});

router.get('/soccer', function(req, res, next){
  var teamCollec = db.collection('Teams');
  teamCollec.find().toArray(function(err, Teams){
    if(err) {return console.dir(err);}
    res.render('soccer.ejs', {title: 'Second String Soccer', data: Teams});
  });
});

module.exports = router;
