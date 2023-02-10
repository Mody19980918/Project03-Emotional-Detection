import { Module } from '@nestjs/common';
import { ForgetController } from './forget.controller';
import { ForgetService } from './forget.service';

@Module({
  controllers: [ForgetController],
  providers: [ForgetService]
})
export class ForgetModule {}
