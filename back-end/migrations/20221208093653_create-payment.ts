import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('payment', (table) => {
    table.increments('id'), table.string('email'), table.integer('users_id');
    table.foreign('users_id').references('users.id');
    table.timestamp('time'), table.integer('price');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('payment');
}
