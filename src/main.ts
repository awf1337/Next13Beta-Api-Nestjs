import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Env from './config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      disableErrorMessages: Env().node_env !== 'development',
    }),
  );

  app.use(cookieParser());

  await app.listen(Env().port);
}
bootstrap();
