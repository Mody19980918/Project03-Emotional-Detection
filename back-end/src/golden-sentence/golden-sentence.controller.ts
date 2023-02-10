import { UserService } from '../user/user.service';
import { GoldenSentenceService } from './golden-sentence.service';
import { Body, Controller, Post, Headers } from '@nestjs/common';
import { int, object } from 'cast.ts';
import { decodeBearerToken } from 'src/user/jwt';

@Controller('golden-sentence')
export class GoldenSentenceController {
  constructor(
    private goldenSentenceService: GoldenSentenceService,
    private userService: UserService,
  ) {}

  @Post()
  submit(@Body() body, @Headers() headers) {
    let userId = decodeBearerToken(headers).id;
    const parser = object({
      score: int({ min: 0 }),
    });
    const { score } = parser.parse(body);
    const game_type = 'golden_sentence';
    return this.goldenSentenceService.addRecord({
      users_id: userId,
      score,
      game_type,
    });
  }
}
