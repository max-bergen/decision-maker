"use strict";

const express = require('express');
const router  = express.Router();
const addToPoll   = require('../db-func/poll');
const initialMailgun     = require("../public/scripts/initialMailgun");


module.exports = (knex) => {
  // renders page
  router.get("/", (req, res) => {
    res.render("index");
  });

  // post route to /
  router.post("/", (req, res) => {
    // Stays on same page if fields blank. Erros is generated on index.ejs
    if (!req.body.title || !req.body.email || !req.body.option1){
      return;
    } else {
      // generates link string
      const adminID = generateRandomString();
      const userID = generateRandomString();
      let optionArray = [];
      // newpoll object with data for DB
      const newPoll = {
       email: req.body.email,
       title: req.body.title,
       adminUrl: adminID,
       userUrl: userID,
       voteCount: 0
      }
      // iterates through options that will be added to DB
      for (let i = 1; i <= 6; i++){
        let currOption = "option" + i;
        let currDescript = "description" + i;
        if (req.body[currOption]) {
          let option = {
            option: req.body[currOption],
            description: req.body[currDescript],
            submitCount: 0
          }
          optionArray.push(option);
        } else {
          break;
        }
      }
      // runs DB script for created new poll
      addToPoll(newPoll, optionArray, knex);
      // Runs mailgun api to send email to admin
      initialMailgun(req.body.email, req.body.title, adminID, userID);
      res.redirect("/submitted");
    }
  });
  return router;
}

// function to generate link string
function generateRandomString() {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let rand = '';

  for (let i = 0; i < 10; i ++) {
    rand += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return rand;
}
