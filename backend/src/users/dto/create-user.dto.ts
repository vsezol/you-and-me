import { CreateUserAttributes } from '../../common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements Readonly<CreateUserAttributes> {
  @ApiProperty({ example: 'Anton', description: 'username' })
  readonly username: string;

  @ApiProperty({ example: 'aboba123', description: 'password' })
  readonly password: string;
}
