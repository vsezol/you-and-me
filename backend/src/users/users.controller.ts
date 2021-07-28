import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserInDB } from '../common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('current')
  getCurrentUser(@Request() req): UserInDB {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllUsers(
    @Request() req,
    @Query('withOutCurrent') withOutCurrent: string
  ): Promise<UserInDB[]> {
    const users = await this.usersService.findByCondition((user) => {
      if (withOutCurrent === 'true') {
        return user.username !== req.user.username;
      } else {
        return true;
      }
    });

    console.log(users);

    return users;
  }
}
