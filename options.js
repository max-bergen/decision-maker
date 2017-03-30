"use strict";
require('dotenv').config();
const ENV         = process.env.ENV || "development";
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);

function addToOptions(options) {
  knex('options').insert({option: options.option, description: options.description, submit_count: options.submitCount, poll_id: options.pollID})
.catch(function(err){
  console.log(err);
})

}

addToOptions({
   option: 'neat',
   description: 'so neat',
   pollID: 1,
   submitCount: 0
 });

console.log("dank");

