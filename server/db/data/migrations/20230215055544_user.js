/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('userlibrary', (table) => {
    table.string('uid', 255).primary();
    table.string('displayName', 13).notNullable();
    table.text('userToken');
    table.boolean('profanity');
    table.boolean('anonymous');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('userlibrary');
};
