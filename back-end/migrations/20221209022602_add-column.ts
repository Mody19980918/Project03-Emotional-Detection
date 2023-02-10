import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.string('gender', 10);
    table.integer('age');
  });
  await knex.schema.alterTable('gameplay', (table) => {
    table.string('game_type', 255);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('gender');
    table.dropColumn('age');
  });
  await knex.schema.alterTable('gameplay', (table) => {
    table.dropColumn('game_type');
  });
}
