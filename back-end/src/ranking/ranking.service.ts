/* eslint-disable prefer-const */
import { InjectKnex, Knex } from 'nestjs-knex';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RankingService {
  constructor(@InjectKnex() private knex: Knex) {}
  async getEmojiGameData() {
    let result = await this.knex('gameplay')
      .join('users', 'users.id', 'gameplay.users_id')
      .select(
        'gameplay.id',
        'gameplay.users_id',
        'gameplay.score',
        'gameplay.date_created',
        'users.username',
      )
      .where('game_type', 'emoji_game')
      .orderBy('score', 'desc');
    console.log(result);

    return result;
  }
  async getGoldenSentenceData() {
    let result = await this.knex('gameplay')
      .join('users', 'users.id', 'gameplay.users_id')
      .select(
        'gameplay.id',
        'gameplay.users_id',
        'gameplay.score',
        'gameplay.date_created',
        'users.username',
      )
      .where('game_type', 'golden_sentence')
      .orderBy('score', 'desc');

    return result;
  }
}
