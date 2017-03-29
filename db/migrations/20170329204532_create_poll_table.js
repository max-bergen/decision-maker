exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('poll', function(table){
      table.increments()
      table.string('title')
      table.string('admin_email')
      table.string('user_email')
      table.integer('vote_count')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('poll')
  ])
};
