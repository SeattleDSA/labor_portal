var express = require("express");
var secured = require("../lib/middleware/secured");
var router = express.Router();

var Airtable = require("airtable");
var base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);

var tableName = "MembersOverTime";
var viewName = "grid";

/* GET user profile. */
router.get("/density_over_time", secured(), function(req, res, next) {
  base(tableName)
    .select({
      maxRecords: 80,
      view: "DateSort"
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