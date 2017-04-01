module.exports = function updateSubmitCount(id, newCount, knex) {

  knex('options')
    .where('id', '=', id)
    .update({
      submit_count: newCount
    }).then(function () {
      });
    return;
}



