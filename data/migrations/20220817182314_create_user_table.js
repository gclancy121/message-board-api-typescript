/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', user => {
    user.increments('user_id');
    user.string('username', 50).unique().notNullable();
    user.string('password', 128).notNullable();
    user.string('about_me', 3000).notNullable().defaultTo("I'm a new weeblet and haven't changed this yet.");
    user.string('profile_picture').notNullable().defaultTo('https://i.pinimg.com/736x/ba/a2/4e/baa24e0fbad55140f9103dcfc44894b0.jpg');
    user.string('fav_waifu').notNullable().defaultTo('Yuuki Asuna');
    user.string('security_question').notNullable();
    user.string('security_question_answer').notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
