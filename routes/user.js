"use strict";

const express = require('express');
const router  = express.Router();
const userQuery   = require('../userQuery');
const findAdminEmail = require('../findAdminEmail');
const submitMailgun = require("../public/scripts/submitMailgun");
const findSubmitCount = require('../find-submit-count');
const updateSubmitCount = require('../update-submit-count');

module.exports = (knex) => {

  router.get("/user/:userID", (req, res) => {
    let poll = userQuery(req.params.userID);
    poll.then(function(options) {
      let templateOptions = {options: options};
      res.render("poll", templateOptions);
    });
  });

  router.post("/user", (req, res) => {
    // posts result form data to database
    let adminEmail = findAdminEmail(req.body.submit[0].optionID);
    adminEmail.then(function(result) {
      submitMailgun(result.email, result.url)
    })
    req.body.submit.forEach(function(vote) {
      let oldCount = findSubmitCount(vote.optionID);
      oldCount.then(function(result) {
        updateSubmitCount(vote.optionID, Number(vote.submitCount) + Number(result));
      });
    })
    res.send({redirect: '/submitted'});
  })

  return router;
}
