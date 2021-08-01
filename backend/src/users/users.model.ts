import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { DatabaseUser, CreateUserAttributes } from '../common';

@Table({
  tableName: 'users',
})
export class UserModel extends Model<UserModel, CreateUserAttributes> implements DatabaseUser {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
