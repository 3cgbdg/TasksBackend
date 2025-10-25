import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CategoriesService {
    constructor(private readonly prisma: PrismaService) { }
    // getting categories
    async findAll():Promise<Category[]> {
        try {
            const categories = await this.prisma.category.findMany({});
            return categories;
        } catch {
            throw new HttpException(`Cannot get categories`, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }
}
