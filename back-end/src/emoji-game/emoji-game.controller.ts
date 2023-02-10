/* eslint-disable prefer-const */
import { EmojiGameService } from './emoji-game.service';
import { Body, Controller, Headers, Post } from '@nestjs/common';
import { int, object } from 'cast.ts';
import { decodeBearerToken } from 'src/user/jwt';

@Controller('emoji-game')
export class EmojiGameController {
  constructor(private emojiGameService: EmojiGameService) {}

  @Post()
  submit(@Body() body, @Headers() headers) {
    let userId = decodeBearerToken(headers).id;
    let parser = object({
      score: int({ min: 0 }),
    });
    let { score } = parser.parse(body);
    let game_type = 'emoji_game';
    return this.emojiGameService.addRecord({
      users_id: userId,
      score,
      game_type,
    });
  }
}
