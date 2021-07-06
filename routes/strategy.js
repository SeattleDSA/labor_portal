var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('strategy', { title: 'Labor Portal Dev' });
});

module.exports = router;
