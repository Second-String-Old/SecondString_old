var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Second String' });
});

router.get('/stats', function(req, res, next) {
  res.render('stats.ejs', { title: 'Second String' });
});

router.get('/projected', function(req, res, next) {
  res.render('projected.ejs', { title: 'Second String' });
});

module.exports = router;
