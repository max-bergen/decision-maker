//takes in id of option in the options table and returns its current vote ranking
module.exports = function findSubmitCount(optionId, knex) {
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
        resolve({submitCount: rows[0].submit_count, voteCount: rows2[0].vote_count});
      });
   })
  });
}
