require('dotenv').config();
const ENV         = process.env.ENV || "development";
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);

module.exports = function findSubmitCount(optionId) {
  let submitCountArr = [];
  return new Promise((resolve, reject) => {
    knex.select('*').from('options')
    .where('id', '=', optionId)
    .asCallback(function(err, rows) {
      if (err) return reject(err);
      resolve (rows[0].submit_count);
   })
  });
}
