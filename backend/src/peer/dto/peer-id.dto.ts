import { ApiProperty } from '@nestjs/swagger';

export class PeerIdDto {
  @ApiProperty({ example: '', description: 'Id of peer' })
  peerId: string;
}
