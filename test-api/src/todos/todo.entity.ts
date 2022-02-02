import { TodoStatus } from './todos.interface';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Todo extends Model<Todo> {
  @Column({
    primaryKey: true,
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    unique: true
  })
  id: string;

  @Column({
    type: DataType.STRING
  })
  title: string;

  @Column({
    type: DataType.STRING
  })
  description: string;

  @Column({
    type: DataType.ENUM,
    values: ['OPEN','IN_PROGRESS','DONE'],
    allowNull: false,
  })
  status: string;
}