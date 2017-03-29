exports.seed = function(knex, Promise) {
  return knex('poll').del()
    .then(function () {
      return Promise.all([
        knex.insert({option: 'chill', description: 'chill hard', poll_id: 1, submit_count: 1}).into('options')
      ]);
    });
};
