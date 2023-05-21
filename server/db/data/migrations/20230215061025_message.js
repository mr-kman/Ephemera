/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('message', (table) => {
    table.increments('id').primary();
    table
      .string('fb_uid')
      .unsigned()
      .references('uid')
      .inTable('userlibrary')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.string('messagePlain', 255);
    table.string('messageFilter', 255);
    table.integer('messageSize');
    table.dateTime('uploadTime');
    table.integer('likeCount');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('message');
};
