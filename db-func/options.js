//creates a new row in option table
module.exports = function addToOptions(options, pollID, knex) {
  options.forEach(function(option) {
    knex('options').insert({option: option.option, description: option.description, submit_count: option.submitCount, poll_id: pollID})
      .catch(function(err){
        console.log(err);
      })
  })
}
