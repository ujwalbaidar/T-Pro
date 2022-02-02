import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT } from '../constants';
import { databaseConfig } from './database.config';
import { Todo } from 'src/todos/todo.entity';

export const databaseProviders = [{
  provide: SEQUELIZE,
  useFactory: async () => {
    let config;
    config = databaseConfig.development;
    
    const sequelize = new Sequelize(config);
    sequelize.addModels([Todo]);
    await sequelize.sync();
    return sequelize;
  },
}];