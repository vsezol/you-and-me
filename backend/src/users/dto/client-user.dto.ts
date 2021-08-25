import { ApiProperty } from '@nestjs/swagger';
import { ClientUser } from '../../common';

export class ClientUserDto implements Readonly<ClientUser> {
  constructor({ username, id }: { username: string; id: number }) {
    this.username = username;
    this.id = id;
  }

  @ApiProperty({ example: 'Anton', description: 'username' })
  readonly username: string;

  @ApiProperty({ example: 1, description: 'User id' })
  readonly id: number;
}
