import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './';

@Global()
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
