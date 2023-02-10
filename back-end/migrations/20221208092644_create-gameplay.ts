import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('gameplay', (table) => {
    table.increments('id');
    table.integer('users_id');
    table.foreign('users_id').references('users.id');
    table.integer('score');
    table.date('date_created');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('gameplay');
}
