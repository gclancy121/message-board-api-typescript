
exports.up = function(knex) {
  return knex.schema.createTable('comments', comment => {
    comment.increments('comment_id');
    comment.integer('post_id').notNullable();
    comment.foreign('post_id').references('post_id').inTable('posts');
    comment.string('comment', 3000).notNullable();
    comment.integer('comment_created_by').notNullable();
    comment.foreign('comment_created_by').references('user_id').inTable('users');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('comments');
};
