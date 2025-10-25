import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { PrismModule } from 'prisma/prisma.module';

@Module({
  // importing orm module
  imports: [PrismModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule { }
