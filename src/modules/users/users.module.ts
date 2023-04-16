import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from 'src/services/typeorm';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
  imports: [AuthenticationModule],
})
export class UsersModule {}
