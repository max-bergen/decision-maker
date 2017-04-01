require('dotenv').config();
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);

module.exports = function findAdminEmail(optionId) {
  let submitCountArr = [];
  return new Promise((resolve, reject) => {
    knex.select('*').from('options')
    .where('id', '=', optionId)
    .asCallback(function(err, rows) {
      if (err) return reject(err);
      knex.select('*').from('poll')
      .where('id', '=', rows[0].poll_id)
      .asCallback(function(err, rows2) {
        if (err) return reject(err);
        resolve({email: rows2[0].admin_email, url: rows2[0].admin_url});
      });
   });
  });
}
