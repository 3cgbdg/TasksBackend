import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Task } from '@prisma/client';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) { }
  // creating task
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<{message:string}>  {
    return this.todosService.create(createTodoDto);
  }
  // getting tasks
  @Get()
  async findAll():Promise<Task[]>  {
    return this.todosService.findAll();
  }
  // updating task
  @Patch(':id')
  async update(@Param('id') id: string):Promise<{message:string}>  {
    return this.todosService.update(id);
  }
  // deleting task
  @Delete(':id')
  async remove(@Param('id') id: string):Promise<{message:string}>  {
    return this.todosService.remove(id);
  }
}
