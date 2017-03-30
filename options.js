
require('dotenv').config();
const ENV         = process.env.ENV || "development";
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);

module.exports = function addToOptions(options, pollID) {
  options.forEach(function(option) {
    knex('options').insert({option: option.option, description: option.description, submit_count: option.submitCount, poll_id: pollID})
      .catch(function(err){
        console.log(err);
      })
  })
}
