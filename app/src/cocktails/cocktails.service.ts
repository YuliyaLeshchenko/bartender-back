import { Injectable } from '@nestjs/common';
import { CreateCocktailDto, UpdateCocktailDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CocktailsService {

    constructor(private readonly prisma: PrismaService) {}

    async createCocktail(dto: CreateCocktailDto): Promise<any> {
        const cocktail = {};
        return cocktail;
    }

    async getCocktails(): Promise<any[]> {
        const cocktails = await this.prisma.cocktail.findMany({
            select: {
                name: true,
                imageUrl: true,
                glassType: {
                    select: {
                        name: true,
                        description: true,
                    }
                },
                buildType: {
                    select: {
                        name: true,
                        description: true,
                    }
                },
                instructions: {
                    select: {
                        order: true,
                        text: true,
                    }, 
                    orderBy: {
                        order: 'asc'
                    },
                },
                ingredients: {
                    select: {
                        measurment: {
                            select: {
                                value: true,
                                isMilliliters: true,
                            }
                        },
                        ingredient: {
                            select: {
                                name: true,
                                description: true,
                            }
                        },
                    }
                }
            }
            // include: {
            //     glassType: true,
            //     buildType: true,
            //     instructions: true,
            //     ingredients: {
            //         include:  {
            //             measurment: true,
            //             ingredient: true,
            //         }
            //     },
            // },
        });

        return cocktails;
    }

    async updateCocktail(dto: UpdateCocktailDto) {
        // const cocktails = await this.cocktailRepository.update(dto.id , dto);
        // return cocktails;
    }
}
