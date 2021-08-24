import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PeerModule } from './peer/peer.module';

import { AppController } from './app.controller';
import { PeerController } from './peer/peer.controller';

import { ConfigModule } from '@nestjs/config';
import { UserModel } from './users/users.model';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PeerModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [UserModel],
      autoLoadModels: true,
    }),
    SocketModule,
  ],
  controllers: [AppController, PeerController],
})
export class AppModule {}
