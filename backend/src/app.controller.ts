import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Body } from '@nestjs/common';
import { CreateUserAttributes } from './common';
import { UserModel } from './users/users.model';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: { user: UserModel }) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Body() user: CreateUserAttributes) {
    return this.authService.register(user);
  }
}
