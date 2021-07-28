import { Injectable } from '@nestjs/common';
import { UserInDB, UserWithPassword } from '../common';

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
    {
      userId: 4,
      username: 'test1',
      password: '123456',
    },
    {
      userId: 5,
      username: 'test2',
      password: '123456',
    },
  ];

  async findOne(username: string): Promise<UserInDB | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findByCondition(
    condition: (user: UserInDB) => boolean
  ): Promise<UserInDB[]> {
    return this.users.filter((user) => condition(user));
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
