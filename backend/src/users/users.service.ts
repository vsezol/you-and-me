import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel) private userRepository: typeof UserModel
  ) {}

  public async findOneByUsername(username: string): Promise<UserModel> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  public async findAll(): Promise<UserModel[]> {
    return await this.userRepository.findAll({
      attributes: ['id', 'username'],
    });
  }

  public async findAllWithoutUsername(username: string): Promise<UserModel[]> {
    return await this.userRepository.findAll({
      attributes: ['id', 'username'],
      where: {
        username: {
          [Op.not]: username,
        },
      },
    });
  }

  public async createUser(dto: CreateUserDto): Promise<UserModel> {
    const user = await this.userRepository.create(dto);
    return user;
  }
}
