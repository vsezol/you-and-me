import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PeerModule } from './peer/peer.module';

import { AppController } from './app.controller';
import { PeerController } from './peer/peer.controller';

import { AppService } from './app.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PeerModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'you-and-me',
      models: [],
      autoLoadModels: true,
    }),
  ],
  controllers: [AppController, PeerController],
  providers: [AppService],
})
export class AppModule {}
