var express = require("express");
var secured = require("../lib/middleware/secured");
var router = express.Router();

var Airtable = require("airtable");
var base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);

var tableName = "Members";
var viewName = "by_sector";

/* GET user profile. */
router.get("/sector_data", secured(), function(req, res, next) {
  base(tableName)
    .select({
      view : viewName,
      maxRecords: 80
    })
    .firstPage(function(error, records) {
      res.json({"records" : records});
      },
      function done(err) {
        if (err) {
          res.json({"error" : err});
          return;
        }
      }
    );
});

module.exports = router;