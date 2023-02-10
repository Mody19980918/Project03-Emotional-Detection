import { ForbiddenException, NotFoundException } from '@nestjs/common';
/* eslint-disable prefer-const */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { comparePassword, encodePassword } from '../utils/bcrypt';
import { encodeJWT, JWTPayload } from './jwt';
import { UpdateProfileDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectKnex() private knex: Knex) {}
  secret = 'xxx';
  async register(user: {
    username: string;
    password: string;
    email: string;
    gender: string;
    age: number;
  }) {
    if (user.password.length < 7) {
      throw new HttpException(
        { error: 'password must be more than 8' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const password = encodePassword(user.password);
    const newUser = {
      username: user.username,
      password: password,
      email: user.email,
      gender: user.gender,
      age: user.age,
      admin: false,
    };
    let userExist = await this.knex('users')
      .select('*')
      .where({ username: user.username });

    await this.knex('users').select('*');

    if (userExist.length >= 1) {
      throw new HttpException(
        { error: 'User is exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.knex.table('users').insert(newUser);
    await this.knex.table('users');
    return { success: 'Registration Success!' };
  }

  async confirmLogin(username: string, password: string) {
    let user: undefined | { id: number; admin: boolean; password: string } =
      await this.knex('users')
        .select('id', 'admin', 'password')
        .where({ username: username })
        .first();

    if (!user) {
      throw new NotFoundException('No this user, Please register.');
    }

    const hashedPassword = user.password;
    let isPasswordMatched = comparePassword(password, hashedPassword);
    if (!isPasswordMatched) {
      throw new ForbiddenException('Password mismatch');
    }
    // console.log({ final: final, userId: result[0].id });

    let payload = {
      id: user.id,
      admin: user.admin,
    };
    let token = encodeJWT(payload);
    return {
      success: 'Login Successful',
      token,
      admin: user.admin,
    };
  }

  async updateProfile(id: number, profile: UpdateProfileDTO) {
    let userInformation = await this.knex('users').select('*').where({ id });
    console.log(userInformation);

    if (userInformation.length == 0) {
      throw new HttpException(
        { error: 'User is not exist' },
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.knex('users').update(profile).where({ id });

    return { success: 'Your change is update' };
  }

  async getSelfProfile(id: number): Promise<{
    username: string;
    email: string;
    gender: string;
    age: number;
  }> {
    let user = await this.knex('users')
      .select('username', 'email', 'gender', 'age')
      .where({ id })
      .first();
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async getUserDataOfGender() {
    let counts = await this.knex('users')
      .select('gender')
      .count('gender as count')
      .groupBy('gender');

    return counts as { gender: string; count: number }[];
  }

  async getUserDataOfMember() {
    // let userDataOfMember = await this.knex('users')
    // .select('date_created')
    // .DATE_TRUNC('month','date_created')
    // .count()

    let result = await this.knex.raw(`SELECT
      DATE_TRUNC('month',date_created)
      AS  member_create_to_month,
      COUNT(date_created) as member_count
      FROM users
      GROUP BY DATE_TRUNC('month',date_created) order by member_create_to_month asc`);
    // console.log({ data: data.rows });
    // console.log('HELLO');

    return result.rows as {
      member_create_to_month: string;
      member_count: number;
    }[];
  }

  async getUsername(userId: number) {
    let user = await this.knex('users')
      .select('username')
      .where('id', userId)
      .first();
    if (!user) throw new NotFoundException(`User ${userId} not found`);
    console.log(user);

    return { success: true, username: user.username };
  }

  async changePassword(userId: number, password: string) {
    let hashedPassword = encodePassword(password);
    await this.knex('users')
      .update('password', hashedPassword)
      .where('id', userId);

    return { success: true, message: 'change successful!' };
  }
}
