import {
  Controller,
  Get,
  ParseBoolPipe,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { UserModel } from './users.model';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('current')
  getCurrentUser(@Request() req: { user: UserModel }) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllUsers(
    @Request() req: { user: UserModel },
    @Query('withOutCurrent', ParseBoolPipe) withOutCurrent: boolean
  ): Promise<UserModel[]> {
    if (withOutCurrent) {
      return await this.usersService.findAllWithoutUsername(req.user.username);
    } else {
      return await this.usersService.findAll();
    }
  }
}
