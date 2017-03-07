var express = require('express');
var request = require('request');
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
router.get('/', function(req, res, next) {
  var teamCollec = db.collection('Players');
  teamCollec.find().toArray(function(err, Players){
    if(err) {return console.dir(err);}
    //console.log(Players);
    res.render('index.ejs', { title: 'Second String', data: Players });
    // db.close(function (err){
    //   if(err) throw err;
    // });
  });
  
});

router.get('/stats', function(req, res, next) {
  res.render('stats.ejs', { title: 'Second String' });
});

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

router.get('/games', function(req, res, next){
  res.render('games.ejs', {title: 'Schedule Week 12'});
});


router.get('/soccer', function(req, res, next) {
  request('http://api.football-data.org/v1/fixtures?timeFrame=n1', function (error, response, body, data) {
    if (!error && response.statusCode == 200) {
     
      
      body = JSON.parse(body);
  
      console.log(body.fixtures[0]._links.homeTeam.href);
      res.render('soccer.ejs', {title: 'Soccer - Second String', data: body});
    }
  });
  request('http://api.football-data.org/v1/competitions', function (error, response, body, data) {
    body = JSON.parse(body);
    console.log(body);
  });
});

router.get('/soccerplayers', function(req, res, next){
  request('http://api.football-data.org/v1/teams/66/players', function(error, response, body){
    body = JSON.parse(body);
    console.log(body);
    res.render('soccerplayers.ejs', {title: 'Soccer Players - Second String', data: body}); 
  });
});
module.exports = router;
