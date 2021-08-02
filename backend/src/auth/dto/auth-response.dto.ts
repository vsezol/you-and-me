import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRvanNrZG4iLCJzdWIiOjEwLCJpYXQiOjE2Mjc4ODg1NjMsImV4cCI6MTYyNzg5MjE2M30.nCN9Rf25ZXsLE-0Yr2BsmHtndrEIXmi_GgKl3MMeNZs',
    description: 'Token',
  })
  readonly token: string;

  @ApiProperty({ example: 3600, description: 'Expires in time' })
  readonly expiresIn: number;
}
