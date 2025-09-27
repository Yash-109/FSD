var express = require('express');
var router = express.Router();

/* GET home page with greeting. */
router.get('/', function(req, res, next) {
  res.render('home', { 
    title: 'Home'
  });
});

module.exports = router;