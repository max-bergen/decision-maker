"use strict";

const express = require('express');
const router  = express.Router();
const adminQueryPoll = require('../db-func/admin-query');

module.exports = (knex) => {

  router.get("/admin/:adminID", (req, res) => {
    // pulls admin poll data from DB and passes info to page
    let admin = adminQueryPoll(req.params.adminID, knex);
    admin.then(function(poll) {
      let templateOptions = {poll: poll};
      console.log(templateOptions);
      res.render("admin", templateOptions);
    });
  });
  return router;
}
