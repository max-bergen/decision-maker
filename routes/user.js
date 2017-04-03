"use strict";

const express = require('express');
const router  = express.Router();
const userQuery   = require('../db-func/user-query');
const findAdminEmail = require('../db-func/find-admin-email');
const submitMailgun = require("../public/scripts/submitMailgun");
const findSubmitCount = require('../db-func/find-submit-count');
const updateSubmitCount = require('../db-func/update-submit-count');
const updateVoteCount = require('../db-func/update-vote-count');


module.exports = (knex) => {
  // pulls user poll and option data from DB and passes info to page
  router.get("/user/:userID", (req, res) => {
    let poll = userQuery(req.params.userID, knex);
    poll.then(function(options) {
      let templateOptions = {options: options};
      res.render("poll", templateOptions);
    });
  });

  router.post("/user", (req, res) => {
    // Finds info needed to send admin an email, sends notification that vote has been cast
    let adminEmail = findAdminEmail(req.body.submit[0].optionID, knex);
    adminEmail.then(function(result) {
      submitMailgun(result.email, result.url)
    })
    // posts result form data to database
    req.body.submit.forEach(function(vote) {
      let oldCount = findSubmitCount(vote.optionID, knex);
      oldCount.then(function(result) {
        updateSubmitCount(vote.optionID, Number(vote.submitCount) + Number(result.submitCount), knex);
        updateVoteCount(vote.optionID,Number(result.voteCount) + 1, knex);

      });
    })
  });

  return router;
}
