import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ example: '', description: 'Token' })
  readonly token: string;

  @ApiProperty({ example: 3600, description: 'Expires in time' })
  readonly expiresIn: number;
}
