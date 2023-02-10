/* eslint-disable prefer-const */
import { InjectKnex, Knex } from 'nestjs-knex';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class RecordService {
  constructor(@InjectKnex() private knex: Knex) {}
  secret = 'xxx';
  async getUserEmojiGameData(userId: number) {
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
      .where('users_id', userId)
      .orderBy('score', 'desc');
    console.log('result', result);
    return result;
  }
  async getUserGoldenSentenceData(userId: number) {
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
      .where('users_id', userId)
      .orderBy('score', 'desc');
    return result;
  }
}
