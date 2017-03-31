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

const mailGun     = require("./public/scripts/mailgun");

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
  mailGun(req.body.email, req.body.title, adminID, userID);
});

app.get("/submitted", (req, res) => {
  res.render("submitted");
});

app.get("/admin/:adminID", (req, res) => {
  //Code to generate page at specific admin link
  res.render("admin");
});

app.get("/user/:userID", (req, res) => {
  let poll = userQuery(req.params.userID);
  console.log("================");
  poll.then(res.render("poll", poll));
});

app.post("/user/:userID", (req, res) => {
  // posts result form data to database
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
