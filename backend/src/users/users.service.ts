import { Injectable } from '@nestjs/common';

export interface User {
  username: string;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface UserInDB extends UserWithPassword {
  userId: number;
}

@Injectable()
export class UsersService {
  private users: UserInDB[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
    {
      userId: 3,
      username: 'vsezol',
      password: '123456',
    },
  ];

  async findOne(username: string): Promise<UserInDB | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async insertOne(user: UserWithPassword): Promise<UserInDB> {
    const userForDB = {
      username: user.username,
      password: user.password,
      userId: this.users.length + 1,
    };

    this.users.push(userForDB);

    return userForDB;
  }
}
