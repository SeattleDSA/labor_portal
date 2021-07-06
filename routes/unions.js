var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/unions', function (req, res, next) {
  res.render('unions', { title: 'Labor Portal Dev' });
});

module.exports = router;
