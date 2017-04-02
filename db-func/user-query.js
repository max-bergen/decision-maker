//
module.exports = function queryPoll(userUrl, knex) {
  return new Promise((resolve, reject) => {
    knex.select('id', 'title').from('poll')
      .where('user_url', '=', userUrl)
      .asCallback(function(err, rows) {
        if (err) return reject(err);
        let optionObj = queryOptions({id: rows[0].id, title: rows[0].title}, knex);
        optionObj.then(function(result) {
          resolve(result);
        })
      })
  })
}

function queryOptions(pollObj, knex) {
  return new Promise((resolve, reject) => {
    let optionsArr = [];
    knex.select('id', 'option', 'description').from('options')
      .where('poll_id', '=', pollObj.id)
      .asCallback(function(err, rows) {
        if (err) return console.error(err);
        rows.forEach(function(key){
          let optionsObj = {pollID: pollObj.id, optionID: key.id, option: key.option, description: key.description, title: pollObj.title};
          optionsArr.push(optionsObj);
      })
      resolve(optionsArr);
    })
  })
}
