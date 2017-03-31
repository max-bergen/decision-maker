require('dotenv').config();
const ENV         = process.env.ENV || "development";
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);

module.exports = function queryPoll(userUrl) {
  knex.select('id', 'title').from('poll')
  .where('user_url', '=', userUrl)
  .asCallback(function(err, rows) {
  if (err) return console.error(err);
      queryOptions({id: rows[0].id, title: rows[0].title});
 })
}

function queryOptions(pollObj) {
let optionsArr = [];
knex.select('option', 'description').from('options')
.where('poll_id', '=', pollObj.id)
.asCallback(function(err, rows) {
  if (err) return console.error(err);
      rows.forEach(function(key){
      let optionsObj = {option: key.option, description: key.description, title: pollObj.title};
      optionsArr.push(optionsObj);
      })
      return optionsArr;
  })
}

queryPoll('zwhhzo74ku');

