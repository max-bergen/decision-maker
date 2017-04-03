//takes in existing id and new score to update submit_count in options table
module.exports = function updateSubmitCount(id, newCount, knex) {

  knex.select('*').from('options')
    .where('id', '=', id)
    .asCallback(function(err, rows) {
      if (err) return reject(err);
      console.log(rows[0].poll_id, newCount);
      knex('poll')
        .where('id', '=', rows[0].poll_id)
        .update({
          vote_count: newCount
        })
        .then(function () {
        });
        return;
      });
}
