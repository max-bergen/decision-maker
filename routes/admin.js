"use strict";

const express = require('express');
const router  = express.Router();
const adminQueryPoll = require('../adminQuery');

module.exports = (knex) => {

  router.get("/admin/:adminID", (req, res) => {
    let admin = adminQueryPoll(req.params.adminID);
    admin.then(function(poll) {
      let templateOptions = {poll: poll};
      res.render("admin", templateOptions);
    });
  });

  return router;
}
