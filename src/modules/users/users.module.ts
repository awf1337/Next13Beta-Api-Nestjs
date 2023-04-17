import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from 'src/services/typeorm';
import { AuthenticationModule } from '../authentication/authentication.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
  imports: [AuthenticationModule, PassportModule],
})
export class UsersModule {}
