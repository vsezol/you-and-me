import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EXPIRES_IN } from './constants';
import { UsersService } from '../users/users.service';
import { UserModel } from '../users/users.model';
import { CreateUserAttributes } from '../common';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser({
    username,
    password,
  }: CreateUserAttributes): Promise<UserModel> {
    const userModel = await this.usersService.findOneByUsername(username);

    if (userModel && userModel.password === password) {
      return userModel;
    }

    return null;
  }

  async register(user: CreateUserAttributes): Promise<AuthResponseDto> {
    const userModel = await this.usersService.createUser(user);
    return this.login(userModel);
  }

  async login(userModel: UserModel): Promise<AuthResponseDto> {
    const payload = { username: userModel.username, sub: userModel.id };
    return {
      token: this.jwtService.sign(payload),
      expiresIn: EXPIRES_IN,
    };
  }
}
