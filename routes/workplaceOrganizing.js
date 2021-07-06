var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/workplaceOrganizing', function (req, res, next) {
  res.render('workplaceOrganizing', { title: 'Workplace Organizing' });
});

module.exports = router;