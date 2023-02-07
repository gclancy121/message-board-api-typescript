exports.up = function(knex) {
  return knex.schema.createTable('posts', post => {
    post.increments('post_id');
    post.integer('created_by').notNullable();
    post.foreign('created_by').references('user_id').inTable('users');
    post.string('post_title', 30).notNullable();
    post.string('post_body', 3000).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts');
};
