import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { UserModel } from '../users/users.model';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @ApiBody({ type: CreateUserDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: UserModel }) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Register User' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }
}
