const addToOptions   = require('./options');

module.exports = function addToPoll(poll, option, knex) {
  knex('poll').insert({title: poll.title, admin_email: poll.email, admin_url: poll.adminUrl, user_url: poll.userUrl, vote_count: poll.voteCount})
    .returning('id')
    .then(function (response) {
      addToOptions(option, response[0], knex);
    })
    .catch(function(err){
      console.log(err);
    })
}
