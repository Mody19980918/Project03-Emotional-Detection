/* eslint-disable prefer-const */
import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Post,
  Session,
} from '@nestjs/common';
import { decodeBearerToken } from './jwt';

import { ChangePasswordDTO, UpdateProfileDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  async register(@Body() body) {
    if (!body) {
      return { error: 'No username and password' };
    }

    let { username, password, email, gender, age } = body;

    if (!username) {
      throw new HttpException({ error: 'No username' }, HttpStatus.BAD_REQUEST);
      // return ({error: "No username"})
    }

    if (!password) {
      throw new HttpException({ error: 'No password' }, HttpStatus.BAD_REQUEST);
      // return ({error: "No password"})
    }

    if (!email) {
      throw new HttpException({ error: 'No email' }, HttpStatus.BAD_REQUEST);
    }

    if (!gender) {
      throw new HttpException({ error: 'No gender' }, HttpStatus.BAD_REQUEST);
    }

    if (!age) {
      throw new HttpException({ error: 'No age' }, HttpStatus.BAD_REQUEST);
    }

    return await this.userService.register({
      username,
      password,
      email,
      gender,
      age,
    });
  }

  @Post('/login')
  async confirmLogin(
    @Session() session,
    @Body('username') username,
    @Body('password') password,
  ) {
    // console.log('username', username);
    if (!username && !password) {
      throw new HttpException(
        { error: 'No username and password' },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!username) {
      // console.log(username);
      throw new HttpException({ error: 'No username' }, HttpStatus.BAD_REQUEST);
    }

    if (!password) {
      throw new HttpException({ error: 'No password' }, HttpStatus.BAD_REQUEST);
    }

    let result = await this.userService.confirmLogin(username, password);
    // console.log(session.name);
    // session.name = await sessionId;
    return result;
  }

  // @Get('/session')
  // getAll(@Session() session) {
  //   console.log(session);
  //   session.name = Math.random();
  //   // console.log(session.name);
  // }

  @Get('/username')
  async getUsername(@Headers() headers) {
    let userId = decodeBearerToken(headers).id;
    return await this.userService.getUsername(userId);
  }

  @Post('/profile')
  async updateProfile(@Body() profile: UpdateProfileDTO, @Headers() headers) {
    console.log('HIHI', profile);

    let userId = decodeBearerToken(headers).id;
    return await this.userService.updateProfile(userId, profile);
  }

  @Get('/self-profile')
  async gainUserInformation(@Headers() headers) {
    let user_id = decodeBearerToken(headers).id;
    return await this.userService.getSelfProfile(user_id);
  }

  @Get('/stats')
  async getUserStats() {
    let members = await this.userService.getUserDataOfMember();
    let genders = await this.userService.getUserDataOfGender();
    return { members, genders };
  }

  @Post('/password')
  changePassword(@Body() body: ChangePasswordDTO, @Headers() headers) {
    let userId = decodeBearerToken(headers).id;
    return this.userService.changePassword(userId, body.password);
  }
}
