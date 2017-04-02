//takes in id of option in the options table and returns its current vote ranking
module.exports = function findSubmitCount(optionId, knex) {
  let submitCountArr = [];
  return new Promise((resolve, reject) => {
    knex.select('*').from('options')
    .where('id', '=', optionId)
    .asCallback(function(err, rows) {
      if (err) return reject(err);
      resolve (rows[0].submit_count);
   })
  });
}
