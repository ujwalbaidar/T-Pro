import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    unique: true
  })
  id: string;

  @Column({
    unique: true
  })
  username: string;

  @Column({
    type: DataType.STRING
  })
  password: string;
}