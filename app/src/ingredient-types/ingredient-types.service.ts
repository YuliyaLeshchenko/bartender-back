import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIngredientTypeDto } from './dto';
import { IngredientType } from '@prisma/client';

@Injectable()
export class IngredientTypesService {

    constructor(private readonly prisma: PrismaService) {}

    async createIngredientType(dto: CreateIngredientTypeDto): Promise<IngredientType> {
        const ingredientType = await this.prisma.ingredientType.create({data: dto});
        return ingredientType;
    }

    async getAllIngredientTypes(): Promise<IngredientType[]> {
        const ingredientTypes = await this.prisma.ingredientType.findMany();
        return ingredientTypes;
    }
}
