import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Task, TaskStatus } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) { }
  async create(dto: CreateTodoDto): Promise<{ message: string }> {
    // validating for no more than 5 per category 
    const count = await this.prisma.task.count({ where: { category: { id: dto.categoryId },status:TaskStatus.INCOMPLETED } });
    if (count > 5) {
      throw new HttpException(`Too many tasks in the category`, HttpStatus.BAD_REQUEST);
    } else {
      try {

        await this.prisma.task.create({ data: { text: dto.text, category: { connect: { id: dto.categoryId } } } })
      } catch {
        throw new HttpException(`Cannot create new task`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return { message: 'Succcessfully created!' }
    }
  }


  async findAll(): Promise<Task[]> {
    try {
      const tasks = await this.prisma.task.findMany({ where: { status: TaskStatus.INCOMPLETED }, include: { category: true } });
      return tasks;
    } catch {
      throw new HttpException(`Cannot get tasks`, HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }



  async update(id: string): Promise<{ message: string }> {
    await this.prisma.task.update({ where: { id: id }, data: { status: TaskStatus.COMPLETED } });
    return { message: 'Succcessfully updated!' }
  }

  async remove(id: string): Promise<{ message: string }> {

    const task = await this.prisma.task.findUnique({ where: { id: id } });
    if (!task) {
      throw new NotFoundException();
    } else {
      await this.prisma.task.delete({ where: { id: id } });
      return { message: 'Succcessfully deleted!' }

    }

  }
}
