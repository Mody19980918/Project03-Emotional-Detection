import { RankingService } from './ranking.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('ranking')
export class RankingController {
  constructor(private rankingService: RankingService) {}
  @Get('/emoji_game')
  async getEmojiGameData() {
    return await this.rankingService.getEmojiGameData();
  }

  @Get('/golden_sentence')
  async getGoldenSentenceData() {
    return await this.rankingService.getGoldenSentenceData();
  }
}
