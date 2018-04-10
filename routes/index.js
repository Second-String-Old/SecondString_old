var express = require('express');
var request = require('request');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;
var mongodbUriFootball = 'mongodb://pledgemaster:skilodge@ds021356.mlab.com:21356/nfldb';
var mongodbUriSoccer = 'mongodb://socceradmin:skilodge@ds123050.mlab.com:23050/soccer';

var pg = require('pg');
var QueryStream = require('pg-query-stream');
var JSONStream = require('JSONStream');
var conString = "localhost://postgres:password@localhost:5432/nfldbnew";
// var client = new pg.Client(conString);
var sql = 
        'select ' +
            'public.player.full_name, ' +
            'sum(public.play_player.passing_yds) as passing_yds ' +
        'from ' +
            'public.play_player ' +
        'left join ' +
            'public.player on (public.player.player_id = public.play_player.player_id) ' +
        'left join ' +
            'public.game on (public.game.gsis_id = public.play_player.gsis_id) ' +
        'where ' +
            "public.game.season_year = 2012 and public.game.season_type = 'Regular' " +
        'group ' +
            'by public.player.full_name ' +
        'having ' +
            'sum(public.play_player.passing_yds) >= 4500 ' +
        'order ' +
            'by passing_yds DESC';
// var sql2 = "SELECT player.full_name, SUM(play_player) AS passing_yds FROM play_player LEFT JOIN player ON (player.player_id = play_player.player_id) LEFT JOIN game ON (game.gsis_id = play_player.gsis_id) WHERE game.season_year = 2012 AND game.season_type = 'Regular' GROUP BY player.full_name HAVING SUM(play_player.passing_yds) >= 4500 ORDER BY passing_yds DESC";
var pool = new pg.Pool({
  connectionString: conString,
});
pool.query(sql)
  .then((res) => console.log(res.rows)) // brianc
  .catch(err => console.error('Error executing query', err.stack));
// pool.connect(function(err, client, done) {
//   if(err) throw err;
//   client.query(sql, (err, res) => {
//     if (err) {
//       console.log(err.stack);
//     } else {
//       console.log(res.rows);
//     }
//   });
// });
// (async () => {

//   const { rows } = await pool.query(sql);
//   console.log('user:', rows);

// })().catch(e => setImmediate(() => { throw e }));
// pool.query(sql, (err, res) => {
//   console.log(res.rows);
// });
// client.connect();

// pool.end()
// callback
var players;
// SELECT player.full_name, SUM(play_player.passing_yds) AS passing_yds
// FROM play_player
// LEFT JOIN player ON player.player_id = play_player.player_id
// LEFT JOIN game ON game.gsis_id = play_player.gsis_id
// WHERE game.season_year = 2012 AND game.season_type = 'Regular'
// GROUP BY player.full_name
// HAVING SUM(play_player.passing_yds) >= 4500
// ORDER BY passing_yds DESC
// client.query('SELECT player.full_name, SUM(play_player) AS passing_yds, FROM play_player, LEFT JOIN player ON player.player_id = play_player.player_id, LEFT JOIN game on game.gsis_id = play_player.gsis_id, WHERE game.season_year = $1 AND game.season_type = $2, GROUP BY player.full_name, HAVING SUM(play_player.passing_yds) >= $3, ORDER BY passing_yds DESC', [2012, 'Regular', 4500], (err, res) => {
// client.query("SELECT * FROM public.play_player LEFT JOIN player ON (player.player_id = play_player.player_id) LIMIT 5", (err, res) => {

// var query = client.query(sql);
// query.on("row", function(row, result){
//   result.addRow(row);
// });
// query.on("end", function(result){
//   console.log(result.rows);
//   client.end();
// });
// client.query("SELECT player.full_name FROM public.play_player LEFT JOIN player ON (player.player_id = play_player.player_id) LEFT JOIN game ON (game.gsis_id = play_player.gsis_id) WHERE game.season_year = 1200 AND game.season_type = 'Regular' GROUP BY player.full_name LIMIT 5", (err, res) => {
// client.query(sql, (err, res) => {
//   if (err) {
//     console.log(err.stack);
//   } else {
//     console.log(res)
//     // players = res.rows[0];
//   }
// });

//connecting to database
//mongoose.connect(mongodbUriFootball);
var db = mongoose.createConnection(mongodbUriFootball);
var soccer_db = mongoose.createConnection(mongodbUriSoccer);

db.on('error', console.error.bind(console, 'connection error:'));
db.on("open", function(){
  console.log("football mongodb is connected!!");
});

soccer_db.on('error', console.error.bind(console, 'connection error: '));
soccer_db.on("open", function(){
  console.log("soccer mongodb is connected!!");
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.ejs', { title: 'Second String' });
});



router.get('/football/players', function(req, res, next) {
  var players;
  // if(req.query.id){
    // client.query("SELECT player.full_name, SUM(play_player.passing_yds) AS passing_yds FROM play_player LEFT JOIN player ON player.player_id = play_player.player_id LEFT JOIN game ON game.gsis_id = play_player.gsis_id WHERE game.season_year = 2012 AND game.season_type = 'Regular' GROUP BY player.full_name HAVING SUM(play_player.passing_yds) >= 4500 ORDER BY passing_yds DESC", (err, response) => {
      // if (err) {
        // console.log(err.stack);
      // } else {
        // console.log(response.rows[0]);
        // res.render('football/players.ejs', { title: 'Second String', data: response.rows})
  //     }
  //   });
  // }
  // else{
  //   res.render
  // }
  console.log(req.query);
  var teamCollec = db.collection('nflgame_players');
  if(req.query.id){
    teamCollec.findOne({_id: ObjectId(req.query.id)}, function(err, obj){
      if(err) {return console.dir(err);}
      console.log(obj);
      console.log(req.query.id);
      res.render('football/player.ejs', { title: 'Second String', data: obj });
    });
  }else{
    teamCollec.find().toArray(function(err, Players){
      if(err) {return console.dir(err);} 
      //console.log(Players);
      // const query = {
      //   text: "SELECT $1, SUM($2) AS $3 FROM $4 LEFT JOIN $5 ON $6 = $7 LEFT JOIN $8 ON $9 = $10 WHERE $11 = $12 AND $13 = $14 GROUP BY $15 HAVING SUM($16) >= $17 ORDER BY $18 DESC",
      //   values: ['player.full_name', 'play_player.passing_yds', 'passing_yds', 'play_player', 'player', 'player.player_id', 'play_player.player_id', 'game', 'game.gsis_id', 'play_player.gsis_id', 'game.season_year', '2012', 'game.season_type', "'Regular'", 'player.full_name', 'play_player.passing_yds', '4500', 'passing_yds'],
      // }
//       const query = {
// //         text: "SELECT player.full_name, SUM(play_player.passing_yds) AS passing_yds" + "FROM play_player"
// // LEFT JOIN player ON player.player_id = play_player.player_id
// // LEFT JOIN game ON game.gsis_id = play_player.gsis_id
// // WHERE game.season_year = 2012 AND game.season_type = 'Regular'
// // GROUP BY player.full_name
// // HAVING SUM(play_player.passing_yds) >= 4500
// // ORDER BY passing_yds DESC
//         text: "SELECT player.full_name, SUM(play_player.passing_yds) AS passing_yds FROM play_player LEFT JOIN player ON player.player_id = play_player.player_id LEFT JOIN game ON game.gsis_id = play_player.gsis_id WHERE game.season_year = 2012 AND game.season_type = 'Regular' GROUP BY player.full_name HAVING SUM(play_player.passing_yds) >= 4500 ORDER BY passing_yds DESC",
//       }
//       client.query(query, (err, response) => {
//       // client.query("SELECT player.full_name, SUM(play_player.passing_yds) AS passing_yds FROM play_player LEFT JOIN player ON player.player_id = play_player.player_id LEFT JOIN game ON game.gsis_id = play_player.gsis_id WHERE game.season_year = 2012 AND game.season_type = 'Regular' GROUP BY player.full_name HAVING SUM(play_player.passing_yds) >= 4500 ORDER BY passing_yds DESC", (err, response) => {
//       // client.query("SELECT * from team", (err, response) => {
//         console.log(response) ;
//       });
      res.render('football/players.ejs', { title: 'Second String', data: Players });
      // db.close(function (err){
      //   if(err) throw err;
      // });
    });
  }
});

router.get('/football/player', function(req, res, next) {
  var teamCollec = db.collection('nflgame_players');
  teamCollec.findOne({_id: req.params.id}, function(err, obj){
    if(err) {return console.dir(err);}
    res.render('football/player.ejs', { title: 'Second String', data: obj });
  });
});

router.get('/stats', function(req, res, next) {
  res.render('stats.ejs', { title: 'Second String' });
});

router.get('/football/teams', function(req, res, next) {
  var teamCollec = db.collection('Teams');
  teamCollec.find().toArray(function(err, Teams){
    if(err) {return console.dir(err);}
    res.render('football/teams.ejs', { title: 'Second String', data: Teams });
    // db.close(function (err){
    //   if(err) throw err;
    // });
  });
});

router.get('/football/games', function(req, res, next){
  res.render('football/games.ejs', {title: 'Schedule Week 12'});
});


router.get('/soccer/matches', function(req, res, next) {
  var options = {
    url: 'http://api.football-data.org/v1/fixtures?timeFrame=n1',
    headers: {'X-Auth-Token' :'cca045f6339142bd9b04ed961c08bd51'
    }
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
     
      
      body = JSON.parse(body);
  
      //console.log(body.fixtures[0]._links.homeTeam.href);
      res.render('soccer/matches.ejs', {title: 'Soccer - Second String', data: body});
    }
  });
  /*var options = {
    url: 'http://api.football-data.org/v1/competitions',
    headers: {'X-Auth-Token' :'cca045f6339142bd9b04ed961c08bd51'
    }
  };
  request(options, function (error, response, body, data) {
    body = JSON.parse(body);
  });*/
});

router.get('/soccer/players', function(req, res, next){
  //889 teams to loop throughs
  /*var options = {
    url: 'http://api.football-data.org/v1/teams/66/players',
    headers:{
      'X-Auth-Token' :'cca045f6339142bd9b04ed961c08bd51'
    }
  };
  
  request(options, function(error, response, body){
    body = JSON.parse(body);
    //console.log(body);
    res.render('soccerplayers.ejs', {title: 'Soccer Players - Second String', data: body}); 
  });*/
  var p_coll = soccer_db.collection('Players');
  p_coll.find({"position" : "Centre Back"}).toArray(function(err, players){
    if(err) {return console.dir(err);}
    //console.log(players);
    res.render('soccer/players.ejs', { title: 'Second String - Players', data: players });
  });  
});

router.get('/baseball/players', function(req, res, next){
  var teamCollec = db.collection('Players');
  teamCollec.find().toArray(function(err, Players){
    if(err) {return console.dir(err);} 

    res.render('baseball/players.ejs', {title: 'Baseball Players'});
  });
});

router.get('/baseball/teams', function(req, res, next){
  res.render('baseball/teams.ejs', {title: 'Baseball Teams'});
});

module.exports = router;
