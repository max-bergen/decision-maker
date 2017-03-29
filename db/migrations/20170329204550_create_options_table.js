exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('options', function(table){
      table.increments()
      table.string('option')
      table.string('description')
      table.integer('submit_count')
      table.integer('poll_id').unsigned()
      table.foreign('poll_id').references('poll.id')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('options')
  ])
};
