import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PeerController } from './peer/peer.controller';
import { PeerModule } from './peer/peer.module';

@Module({
  imports: [AuthModule, UsersModule, PeerModule],
  controllers: [AppController, PeerController],
  providers: [AppService],
})
export class AppModule {}
