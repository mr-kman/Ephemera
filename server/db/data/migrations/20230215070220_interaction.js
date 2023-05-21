/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('interaction', (table) => {
    table.increments('id').primary();
    table
      .string('fb_uid')
      .unsigned()
      .references('uid')
      .inTable('userlibrary')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .integer('messageId')
      .unsigned()
      .references('id')
      .inTable('message')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.integer('likeInteraction');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('interaction');
};
