"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

const addToPoll   = require('./poll');
const userQuery   = require('./userQuery');
const updateSubmitCount   = require('./update-submit-count');
const findSubmitCount = require('./find-submit-count');
const findAdminEmail = require('./findAdminEmail');

const adminQueryPoll = require('./adminQuery');


const submitMailgun     = require("./public/scripts/submitMailgun");
const initialMailgun     = require("./public/scripts/initialMailgun");

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  // posts create form data to database
  const adminID = generateRandomString();
  const userID = generateRandomString();
  let optionArray = [];

  const newPoll = {
   email: req.body.email,
   title: req.body.title,
   adminUrl: adminID,
   userUrl: userID,
   voteCount: 0
  }

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
  addToPoll(newPoll, optionArray);
  initialMailgun(req.body.email, req.body.title, adminID, userID);
});

app.get("/submitted", (req, res) => {
  res.render("submitted");
});

app.get("/admin/:adminID", (req, res) => {
  let admin = adminQueryPoll(req.params.adminID);
  admin.then(function(poll) {
    let templateOptions = {poll: poll};
    res.render("admin", templateOptions);
  });
});

app.get("/user/:userID", (req, res) => {
  let poll = userQuery(req.params.userID);
  poll.then(function(options) {
    let templateOptions = {options: options};
    res.render("poll", templateOptions);
  });
});

app.post("/user", (req, res) => {
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
  });
  res.redirect("/submitted");
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

//Generates random string, used for admin and user links
function generateRandomString() {
  const charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  let rand = '';

  for (let i = 0; i < 10; i ++) {
    rand += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return rand;
}
