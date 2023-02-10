/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

import { RankingService } from './ranking/ranking.service';
import { RankingModule } from './ranking/ranking.module';

import { RecordModule } from './record/record.module';

import { GoogleLoginModule } from './google_login/google_login.module';

import { GoogleStrategy } from './google.strategy';
import { ForgetModule } from './forget/forget.module';

import { EmojiGameModule } from './emoji-game/emoji-game.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GoldenSentenceModule } from './golden-sentence/golden-sentence.module';

@Module({
  imports: [
    UserModule,
    KnexModule.forRoot({
      config: {
        client: 'postgresql',
        useNullAsDefault: true,
        connection: {
          user: 'emotionaldetection',
          password: 'emotionaldetection',
          database: 'emotionaldetection',
        },
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),
    RankingModule,
    RecordModule,
    GoogleLoginModule,
    EmojiGameModule,
    ForgetModule,
    GoldenSentenceModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, RankingService, GoogleStrategy],
})
export class AppModule {}
