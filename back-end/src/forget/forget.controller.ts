import { ConfirmUserDTO } from './forget.dto';
import { ForgetService } from './forget.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('forget')
export class ForgetController {
  constructor(private forgetService: ForgetService) {}
  @Post()
  confirmUser(@Body() body: ConfirmUserDTO) {
    return this.forgetService.confirmUser(body);
  }
}
