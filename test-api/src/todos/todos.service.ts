import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodoStatus, Todos} from './todos.interface';
import { TodoDto } from './todo.dto';
import { TODO_REPOSITORY } from 'src/core/constants';
@Injectable()
export class TodosService {
  constructor(@Inject(TODO_REPOSITORY) private readonly todoRepository: typeof Todo) { }


  /* Get all todo lists */
  async getAllTodos(): Promise<Todo[]> {
    return await this.todoRepository.findAll<Todo>();
  }

  /* Get todos by id */
  async getTodoById(todoid: string): Promise<Todo>{
    const found = await this.todoRepository.findOne({where: {id: todoid}});
    if(!found){
      throw new NotFoundException();
    }
    return found;
  }

  /* Create Todo */
  async createTodos(todo: TodoDto): Promise<Todo> {
    return await this.todoRepository.create<Todo>(todo);
  }

  /* Delete Todo */
  async deleteTodos(id: string): Promise<any> {
    const result = await this.todoRepository.destroy({where: {id: id}});
    if(result === 0){
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }else{
      return result;
    }
  }
  
  async updateTodo(id: string, data:TodoDto): Promise<Todo>{
    const [numberOfAffectedRows, [updateResult]] = await this.todoRepository.update({...data}, {where: {id: id}, returning: true});
    if(numberOfAffectedRows>=1){
      return updateResult;
    }else{
      throw new NotFoundException();
    }
    
  }
}
