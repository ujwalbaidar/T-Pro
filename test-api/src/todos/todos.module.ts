import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { todoProviders } from './todos.provider';

@Module({
  providers: [TodosService, ...todoProviders],
  controllers: [TodosController]
})
export class TodosModule {}
