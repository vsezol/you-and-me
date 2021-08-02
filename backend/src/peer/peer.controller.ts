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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PeerIdDto } from './dto/peer-id.dto';

@ApiTags('Peer')
@Controller('peer')
export class PeerController {
  constructor(private peerService: PeerService) {}

  @ApiOperation({ summary: 'Add id of peer for a specific user' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Get('add/:id')
  addPeer(@Request() req, @Param('id') id: string) {
    this.peerService.addId(req.user.username, id);

    return { message: 'success' };
  }

  @ApiOperation({ summary: 'Get id of peer by username' })
  @ApiResponse({ status: 200, type: PeerIdDto })
  @UseGuards(JwtAuthGuard)
  @Get('id')
  getPeer(@Query('username') username: string): PeerIdDto {
    const peerId = this.peerService.findId(username) ?? '';

    return { peerId };
  }
}
