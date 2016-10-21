var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose =  require('mongoose');


var routes = require('./routes/index');
var users = require('./routes/users');


var app = express();
var mongodbUri = 'mongodb://pledgemaster:skilodge@ds021356.mlab.com:21356/nfldb';
//connecting to database
mongoose.connect(mongodbUri);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.on("open", function(){
  console.log("mongodb is connected!!");
});
db.once('open', function callback (){
  
  //collec.insert({name: 'Boston Red Sox'});

  /*var teamCollec = db.collection('Teams');
  teamCollec.find().toArray(function(err, Teams){
    if(err) {return console.dir(err);}
    console.log(Teams);
  });*/
  

  //collec.remove({name: 'yankees'});
  /*collec.find().toArray(function(err, Teams){
    if(err) {return console.dir(err);}
    console.log(Teams);
  });*/
    
  db.close(function (err){
    if(err) throw err;
  });
  
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var teamCollec = db.collection('Teams');
app.get('/', function(req, res) {
  teamCollec.find().toArray(function(err, Teams){
    if(err) {return console.dir(err);}
    console.log(Teams);
    res.render('views/index.ejs',{data:Teams}); 
  });
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
//app.use('/stats', routes);
//app.use('/projected',routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

/*app.listen(5000, function() {
  console.log('Example app listening on port 5000!');
});*/

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;