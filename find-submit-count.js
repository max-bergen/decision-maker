require('dotenv').config();
const ENV         = process.env.ENV || "development";
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);

module.exports = function findSubmitCount(pollId) {
  let submitCountArr = [];
  knex.select('*').from('options')
  .where('poll_id', '=', pollId)
  .asCallback(function(err, rows) {
    if (err) return console.error(err);
      rows.forEach(function(key){
        let submitCountObj = {id: key.id, submit_count: key.submit_count};
        submitCountArr.push(submitCountObj);
      })
      return submitCountArr;
 })
}
