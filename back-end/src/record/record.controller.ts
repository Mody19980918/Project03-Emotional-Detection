import { Body, Controller, Headers, Post, Get } from '@nestjs/common';
import { decodeBearerToken } from 'src/user/jwt';
import { RecordService } from './record.service';

@Controller('record')
export class RecordController {
  constructor(private recordService: RecordService) {}
  @Get('/emoji_game')
  async getUserEmojiGameData(@Headers() headers) {
    let userId = decodeBearerToken(headers).id;
    return await this.recordService.getUserEmojiGameData(userId);
  }

  @Get('/golden_sentence')
  async getGoldenSentenceData(@Headers() headers) {
    let userId = decodeBearerToken(headers).id;
    return await this.recordService.getUserGoldenSentenceData(userId);
  }
}
