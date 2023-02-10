import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { GoldenSentenceService } from './golden-sentence.service';
import { GoldenSentenceController } from './golden-sentence.controller';

@Module({
  imports: [UserModule],
  providers: [GoldenSentenceService],
  controllers: [GoldenSentenceController],
})
export class GoldenSentenceModule {}
