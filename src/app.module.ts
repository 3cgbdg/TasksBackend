import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TodosModule } from './todos/todos.module';
import { CategoriesModule } from './categories/categories.module';


@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true,
    }),
     TodosModule,
     CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
