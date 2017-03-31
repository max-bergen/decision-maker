require('dotenv').config();
const ENV         = process.env.ENV || "development";
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);

module.exports = function adminQueryPoll(userUrl) {
  knex.select('*').from('poll')
  .where('user_url', '=', userUrl)
  .asCallback(function(err, rows) {
  if (err) return console.error(err);
      adminQueryOptions({id: rows[0].id, title: rows[0].title, admin_email: rows[0].admin_email, admin_url: rows[0].admin_url, user_url: rows[0].user_url, vote_count: rows[0].vote_count});
 })
}

function adminQueryOptions(pollObj) {
let optionsArr = [];
knex.select('*').from('options')
.where('poll_id', '=', pollObj.id)
.asCallback(function(err, rows) {
  if (err) return console.error(err);
      rows.forEach(function(key){
        let optionsObj = {option: key.option, description: key.description, title: pollObj.title, admin_email: pollObj.admin_email, admin_url: pollObj.admin_url, user_url: pollObj.user_url, submit_count: key.submit_count, vote_count: pollObj.vote_count};
        optionsArr.push(optionsObj);
      })
      console.log(optionsArr);
      return optionsArr;
  })
}

//adminQueryPoll('zwhhzo74ku');
