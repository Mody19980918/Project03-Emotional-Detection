import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { EmojiGameController } from './emoji-game.controller';
import { EmojiGameService } from './emoji-game.service';

@Module({
  imports: [UserModule],
  controllers: [EmojiGameController],
  providers: [EmojiGameService],
})
export class EmojiGameModule {}
