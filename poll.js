"use strict";
require('dotenv').config();
const ENV         = process.env.ENV || "development";
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);

const addToOptions   = require('./options');

module.exports = function addToPoll(poll, option) {
  knex('poll').insert({title: poll.title, admin_email: poll.email, admin_url: poll.adminUrl, user_url: poll.userUrl, vote_count: poll.voteCount})
    .returning('id')
    .then(function (response) {
      addToOptions(option, response[0]);
    })
    .catch(function(err){
      console.log(err);
    })
  knex.destroy();
}
