import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { InjectKnex, Knex } from 'nestjs-knex';
import { encodeJWT } from 'src/user/jwt';

@Injectable()
export class GoogleLoginService {
  constructor(@InjectKnex() private knex: Knex) {}
  secret = 'xxx';
  async confirmGoogleLogin(body: any) {
    // console.log(body.idToken);
    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: body.idToken,
        audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      //   console.log(ticket);
      const payload = ticket.getPayload();
      //   console.log(payload);
      const userid = payload['sub'];

      if (userid == body.id) {
        let userInformation = await this.knex('users')
          .select('id', 'username')
          .where('username', body.email)
          .first();
        console.log(userInformation);
        if (userInformation == undefined) {
          await this.knex('users').insert({
            username: body.email,
          });
        }
        // TODO check if this should be email or username
        let user = await this.knex('users')
          .select('id', 'admin')
          .where('username', body.email)
          .first();
        let payload = {
          id: user.id,
          admin: user.admin,
        };
        let token = encodeJWT(payload);
        return { success: 'Google login Successful', token };
      }
    } catch (err) {
      console.error(err);
    }
  }
}
