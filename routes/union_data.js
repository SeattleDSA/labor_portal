var express = require("express");
var secured = require("../lib/middleware/secured");
var router = express.Router();

var Airtable = require("airtable");
var base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);


/* GET user profile. */
router.get("/union_data", secured(), function(req, res, next) {
  base("Unions")
    .select({
      fields: ["name", "member_count", "sector"],
      view : "member_view",
      maxRecords: 100
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