import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';

import { TodosService } from './todos.service';
import { TodoDto } from './todo.dto';
import { Todo as TodoEntity } from './todo.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('todo')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  async getAllTodos() {
    return await this.todosService.getAllTodos();
  }

  @Get('/:id')
  async getTodoById(@Param('id') id: string): Promise<TodoEntity>{
    return await this.todosService.getTodoById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createTodo(@Body() todoDto: TodoDto, @Request() req): Promise<TodoEntity> {
    todoDto['status'] = 'OPEN';
    return await this.todosService.createTodos(todoDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  async deleteTodo(@Param('id') id: string): Promise<any> {
    return await this.todosService.deleteTodos(id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  async updateTodo(@Param('id') id: string, @Body() todoDto: TodoDto): Promise<TodoEntity>{
    
    let data = {
      title: todoDto.title,
      description: todoDto.description,
      status: todoDto.status
    };

    return await this.todosService.updateTodo(id, data);
  }
}
