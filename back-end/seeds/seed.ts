import { Knex } from 'knex';
import { encodePassword } from '../src/utils/bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('gameplay').del();
  await knex('users').del();

  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
  await knex.raw('ALTER SEQUENCE gameplay_id_seq RESTART WITH 1');

  // Inserts seed entries
  let usersArr = await knex('users')
    .insert([
      { username: 'tecky1234', date_created: '2022-01-03', gender: 'male' },
      { username: 'reemo123', date_created: '2022-02-03', gender: 'male' },
      { username: 'beeno123', date_created: '2022-02-03', gender: 'male' },
      { username: 'jerching123', date_created: '2022-04-03', gender: 'male' },
      { username: 'miss1234', date_created: '2022-03-03', gender: 'female' },
      { username: 'donny1997', date_created: '2022-03-03', gender: 'male' },
      { username: 'test', date_created: '2022-04-03', gender: 'male' },
      { username: 'test', date_created: '2022-04-03', gender: 'male' },
      { username: 'test', date_created: '2022-04-03', gender: 'male' },
      { username: 'test', date_created: '2022-04-03', gender: 'female' },
      { username: 'test', date_created: '2022-05-03', gender: 'female' },
      { username: 'test', date_created: '2022-05-03', gender: 'female' },
      { username: 'test', date_created: '2022-06-03', gender: 'female' },
      { username: 'test', date_created: '2022-06-03', gender: 'female' },
      { username: 'test', date_created: '2022-06-03', gender: 'female' },
      { username: 'test', date_created: '2022-06-03', gender: 'female' },
      { username: 'test', date_created: '2022-06-03', gender: 'female' },
      { username: 'test', date_created: '2022-06-03', gender: 'female' },
      { username: 'test', date_created: '2022-06-03', gender: 'female' },
      { username: 'test', date_created: '2022-07-03', gender: 'female' },
      { username: 'test', date_created: '2022-07-03', gender: 'female' },
      { username: 'test', date_created: '2022-07-03', gender: 'female' },
      { username: 'test', date_created: '2022-08-03', gender: 'male' },
      { username: 'test', date_created: '2022-08-03', gender: 'male' },
      { username: 'test', date_created: '2022-09-03', gender: 'male' },
      { username: 'test', date_created: '2022-10-03', gender: 'male' },
      { username: 'test', date_created: '2022-11-03', gender: 'male' },
      { username: 'test', date_created: '2022-11-03', gender: 'other' },
      { username: 'test', date_created: '2022-11-03', gender: 'other' },
      { username: 'test', date_created: '2022-11-03', gender: 'other' },
      { username: 'test', date_created: '2022-12-03', gender: 'other' },
      { username: 'test', date_created: '2022-12-03', gender: 'other' },
      { username: 'test', date_created: '2022-12-03', gender: 'other' },
      { username: 'test', date_created: '2022-12-03', gender: 'other' },
      { username: 'test', date_created: '2022-12-03', gender: 'other' },
      {
        username: 'admin',
        password: encodePassword('adminismody'),
        date_created: '2022-12-21',
        admin: true,
        gender: 'other',
      },
    ])
    .returning('id');

  await knex('gameplay').insert([
    {
      users_id: '1',
      score: 25,
      date_created: '2022-12-20',
      game_type: 'emoji_game',
    },
    {
      users_id: '2',
      score: 20,
      date_created: '2022-12-20',
      game_type: 'emoji_game',
    },
    {
      users_id: '3',
      score: 13,
      date_created: '2022-12-20',
      game_type: 'emoji_game',
    },
    {
      users_id: '2',
      score: 10,
      date_created: '2022-12-20',
      game_type: 'emoji_game',
    },
    {
      users_id: '4',
      score: 12,
      date_created: '2022-12-20',
      game_type: 'emoji_game',
    },
    {
      users_id: '5',
      score: 22,
      date_created: '2022-12-20',
      game_type: 'emoji_game',
    },
    {
      users_id: '1',
      score: 23,
      date_created: '2022-12-20',
      game_type: 'golden_sentence',
    },
    {
      users_id: '2',
      score: 35,
      date_created: '2022-12-20',
      game_type: 'golden_sentence',
    },
    {
      users_id: '3',
      score: 14,
      date_created: '2022-12-20',
      game_type: 'golden_sentence',
    },
    {
      users_id: '2',
      score: 15,
      date_created: '2022-12-20',
      game_type: 'golden_sentence',
    },
    {
      users_id: '4',
      score: 10,
      date_created: '2022-12-20',
      game_type: 'golden_sentence',
    },
    {
      users_id: '5',
      score: 29,
      date_created: '2022-12-20',
      game_type: 'golden_sentence',
    },
  ]);
}
