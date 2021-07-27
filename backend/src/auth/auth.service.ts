import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EXPIRES_IN } from './constants';
import { User, UserInDB, UserWithPassword } from '../common';
import { UsersService } from '../users/users.service';

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

  async register(user: UserWithPassword) {
    const userInDB = await this.usersService.insertOne(user);
    return this.login(userInDB);
  }

  async login(user: UserInDB) {
    const payload = { username: user.username, sub: user.userId };
    return {
      token: this.jwtService.sign(payload),
      expiresIn: EXPIRES_IN,
    };
  }
}
