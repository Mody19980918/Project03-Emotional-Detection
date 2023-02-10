import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import * as session from 'express-session';
import * as express from 'express';
import { NotFoundExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();

  app.use(express.static('../FrontEnd/www'));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: 'keyboard cat',
      cookie: { maxAge: 60000 },
    }),
  );
  app.useGlobalFilters(new NotFoundExceptionFilter());

  // app.useStaticAssets();
  await app.listen(3000);
}
bootstrap();
