import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Env from './config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      disableErrorMessages: Env().node_env !== 'development',
    }),
  );

  await app.listen(Env().port);
}
bootstrap();
