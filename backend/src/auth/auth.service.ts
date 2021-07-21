import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  User,
  UserInDB,
  UsersService,
  UserWithPassword,
} from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    username: UserInDB['username'],
    password: UserInDB['password']
  ): Promise<User> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserInDB) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: UserWithPassword) {
    const userInDB = await this.usersService.insertOne(user);
    return this.login(userInDB);
  }
}
