/* eslint-disable prettier/prettier */
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('gameplay', (table) => {
    table.dropColumn('date_created');
  });
  await knex.schema.alterTable('gameplay', (table) => {
    table.date('date_created').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('gameplay', (table) => {
    table.date('date_created');
  });
}
