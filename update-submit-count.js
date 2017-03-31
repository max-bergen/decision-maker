require('dotenv').config();
const ENV         = process.env.ENV || "development";
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);

module.exports = function updateSubmitCount(id, newCount) {

  knex('options')
    .where('id', '=', id)
    .update({
      submit_count: newCount
    }).then(function () {
      });
    return;
}



