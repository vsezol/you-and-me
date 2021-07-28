import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PeerService } from './peer.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('peer')
export class PeerController {
  constructor(private peerService: PeerService) {}

  @UseGuards(JwtAuthGuard)
  @Get('add/:id')
  addPeer(@Request() req, @Param('id') id: string) {
    this.peerService.addId(req.user.username, id);

    return { message: 'success' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('id')
  getPeer(@Query('username') username: string) {
    const peerId = this.peerService.findId(username) ?? '';

    return { peerId };
  }
}
