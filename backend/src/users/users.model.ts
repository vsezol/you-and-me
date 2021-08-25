import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { DatabaseUser, CreateUserAttributes } from '../common';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  tableName: 'users',
})
export class UserModel
  extends Model<UserModel, CreateUserAttributes>
  implements DatabaseUser
{
  @ApiProperty({ example: 1, description: 'id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Anton', description: 'id' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @ApiProperty({ example: 'aboba123', description: 'password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
