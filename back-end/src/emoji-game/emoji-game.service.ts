import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';

@Injectable()
export class EmojiGameService {
  constructor(
    @InjectKnex()
    private knex: Knex,
  ) {}
  async addRecord(record: {
    users_id: number;
    score: number;
    game_type: string;
  }) {
    const id = await this.knex.insert(record).into('gameplay').returning('id');
    return { id };
  }
}
