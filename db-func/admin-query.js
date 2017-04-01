module.exports = function adminQueryPoll(userUrl, knex) {
  return new Promise((resolve, reject) => {

    knex.select('id', 'title', 'vote_count').from('poll')
      .where('admin_url', '=', userUrl)
      .asCallback(function(err, rows) {
        if (err) return reject(err);
        let adminQuery = adminQueryOptions({id: rows[0].id, title: rows[0].title, vote_count: rows[0].vote_count}, knex);
        adminQuery.then(function(result) {
          resolve(result);
        })
   })
 })
}

function adminQueryOptions(pollObj, knex) {
  return new Promise((resolve, reject) => {
  let optionsArr = [];
  knex.select('*').from('options')
    .where('poll_id', '=', pollObj.id)
    .asCallback(function(err, rows) {
      if (err) return reject(err);
      rows.forEach(function(key){
        let optionsObj = {option: key.option, description: key.description, title: pollObj.title, submit_count: key.submit_count, vote_count: pollObj.vote_count};
          optionsArr.push(optionsObj);
        })
      resolve(optionsArr);
    })
  })
}
