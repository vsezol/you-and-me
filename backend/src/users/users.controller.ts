import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserInDB } from '../common';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('current')
  getCurrentUser(@Request() req): UserInDB {
    return req.user;
  }
}
