import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { GoogleLoginService } from './google_login.service';

@Controller('google-login')
export class GoogleLoginController {
  constructor(private googleLoginService: GoogleLoginService) {}
  @Post('/confirm')
  confirmGoogleLogin(@Body() body) {
    return this.googleLoginService.confirmGoogleLogin(body);
  }
}
