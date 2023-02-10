import { Knex } from 'knex';
// import { knex } from '../db';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('name', 30);
    table.string('password', 255);
    table.boolean('admin');
    table.string('email', 255);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
