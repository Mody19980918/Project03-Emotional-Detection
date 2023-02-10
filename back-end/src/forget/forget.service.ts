import { ConfirmUserDTO } from './forget.dto';
import { encodeJWT } from 'src/user/jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class ForgetService {
  constructor(@InjectKnex() private knex: Knex) {}
  secret = 'xxx';

  // TODO specify the input fields
  async confirmUser(body: ConfirmUserDTO) {
    let user = await this.knex('users')
      .select('id', 'admin')
      .where(body)
      .first();
    if (!user) {
      throw new NotFoundException('user is not exist!');
    }

    let payload = {
      id: user.id,
      admin: user.admin,
    };

    let token = encodeJWT(payload);
    return {
      success: true,
      error: false,
      message: 'your identity is confirm.',
      token: token,
    };
  }
}
