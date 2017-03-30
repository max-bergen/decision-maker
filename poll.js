"use strict";
require('dotenv').config();
const ENV         = process.env.ENV || "development";
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);

module.exports = function addToPoll(poll) {
  console.log(poll);
  knex('poll').insert({title: poll.title, admin_email: poll.email, admin_url: poll.adminUrl, user_url: poll.userUrl, vote_count: poll.voteCount})
    .returning('id')
    .catch(function(err){
  console.log(err);
})

}

// addToPoll({
//    email: 'kush@bogue.dank',
//    title: 'how many',
//    adminUrl: 'admin',
//    userUrl: 'user',
//    voteCount: 0
//  });

console.log("chill");
