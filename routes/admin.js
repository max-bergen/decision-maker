"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
const adminQueryPoll = require('../db-func/admin-query');

  router.get("/admin/:adminID", (req, res) => {
    let admin = adminQueryPoll(req.params.adminID, knex);
    admin.then(function(poll) {
      let templateOptions = {poll: poll};
      res.render("admin", templateOptions);
    });
  });

  return router;
}
