import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthResponse, AuthService } from './auth/auth.service';
import { Body } from '@nestjs/common';
import { CreateUserAttributes } from './common';
import { UserModel } from './users/users.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({ status: 200 })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: { user: UserModel }) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Register User' })
  @ApiResponse({ status: 200 })
  @Post('auth/register')
  async register(@Body() user: CreateUserAttributes) {
    return this.authService.register(user);
  }
}
