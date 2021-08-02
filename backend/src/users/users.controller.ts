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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ClientUserDto } from './dto/client-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get current users' })
  @ApiResponse({ status: 200, type: ClientUserDto })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('current')
  getCurrentUser(@Request() req: { user: UserModel }): ClientUserDto {
    return new ClientUserDto(req.user);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [ClientUserDto] })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllUsers(
    @Request() req: { user: UserModel },
    @Query('withOutCurrent', ParseBoolPipe) withOutCurrent: boolean
  ): Promise<ClientUserDto[]> {
    if (withOutCurrent) {
      return await this.usersService.findAllWithoutUsername(req.user.username);
    } else {
      return await this.usersService.findAll();
    }
  }
}
