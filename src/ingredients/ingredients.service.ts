import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIngredintDto, IngredientDto } from './dto';

@Injectable()
export class IngredientsService {

    constructor(private readonly prisma: PrismaService) {}

    async createIngredient(dto: CreateIngredintDto): Promise<IngredientDto> {
        const ingredient = await this.prisma.ingredient.create({data: dto});
        return ingredient;
    }

    async getIngredients(): Promise<any[]> {
        const ingredients = await this.prisma.ingredient.findMany({
            include: {
                ingredientType: true,
            }
        });
        return ingredients;
    }

    async getIngredientsByType(typeId: number) {
        const ingredients = await this.prisma.ingredient.findMany({
            where: {
                ingredientTypeId: +typeId,
            },
            include: {
                ingredientType: true,
            }
        });
        return ingredients;
    }

    async getIngredientsById(id: number) {
        const ingredient = await this.prisma.ingredient.findFirst({
            where: {
                id: +id,
            },
            include: {
                ingredientType: true,
            }
        });
        return ingredient;
    }
}
