import { Module } from '@nestjs/common';
import { GoogleLoginController } from './google_login.controller';
import { GoogleLoginService } from './google_login.service';

@Module({
  controllers: [GoogleLoginController],
  providers: [GoogleLoginService]
})
export class GoogleLoginModule {}
