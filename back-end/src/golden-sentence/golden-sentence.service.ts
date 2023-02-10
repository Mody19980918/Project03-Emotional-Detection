import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';

@Injectable()
export class GoldenSentenceService {
  constructor(
    @InjectKnex()
    private knex: Knex,
  ) {}
  async addRecord(record: {
    users_id: number;
    score: number;
    game_type: string;
  }) {
    console.log('record', record);

    const id = await this.knex.insert(record).into('gameplay').returning('id');
    console.log(id);

    return { id };
  }
}
