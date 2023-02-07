
exports.up = function(knex) {
  return knex.schema.createTable('complaints', complaint => {
    complaint.increments('complaint_id');
    complaint.string('name', 50).notNullable();
    complaint.string('email', 50).notNullable();
    complaint.string('complaint', 3000).notNullable();
  })
};


exports.down = function(knex) {
  return knex.schema.dropTableIfExists('complaints');
};
