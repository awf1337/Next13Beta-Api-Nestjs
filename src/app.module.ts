import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import EnvConfiguration from './config';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './services/typeorm/database.module';
import { Users } from './modules/entities';
import { UsersModule } from './modules/users/users.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [EnvConfiguration] }),
    DatabaseModule,
    Users,
    UsersModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
