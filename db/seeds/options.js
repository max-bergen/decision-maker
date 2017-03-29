exports.seed = function(knex, Promise) {
  return knex('poll').del()
    .then(function () {
      return Promise.all([
        knex.insert({option: 'chill', description: 'chill hard', submit_count: 1}).into('options')
      ]);
    });
};
