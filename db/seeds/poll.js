exports.seed = function(knex, Promise) {
  return knex('poll').del()
    .then(function () {
      return Promise.all([
        knex.insert({title: 'what to do?', admin_email: 'chilldude22@hotmale.com', admin_url: '123456', user_url: '654321',
          vote_count: 1}).into('poll')
      ]);
    });
};


