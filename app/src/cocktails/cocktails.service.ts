import { Injectable } from '@nestjs/common';
import { CreateCocktailDto, UpdateCocktailDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CocktailsService {

    constructor(private readonly prisma: PrismaService) { }

    async createCocktail(dto: CreateCocktailDto): Promise<any> {
        const cocktail = {};
        return cocktail;
    }

    async getCoctailsForSearch() {
        const cocktails = await this.prisma.cocktail.findMany({
            where: {
                isPublished: true,
            },
            select: {
                id: true,
                name: true,
                imageUrl: true,
            }
        });

        return cocktails;
    }

    async getCocktails(): Promise<any[]> {
        const cocktails = await this.prisma.cocktail.findMany({
            where: {
                isPublished: true,
            },
            select: {
                id: true,
                name: true,
                imageUrl: true,
                glassType: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    }
                },
                buildType: {
                    select: {
                        id: true,
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
                                id: true,
                                name: true,
                                description: true,
                            }
                        },
                    }
                }
            }
        });

        return cocktails;
    }

    async getCocktailById(id: number) {
        const cocktail = await this.prisma.cocktail.findFirst({
            where: {
                id: +id,
                isPublished: true,
            },
            select: {
                id: true,
                name: true,
                imageUrl: true,
                rating: true,
                countOfRating: true,
                glassType: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    }
                },
                buildType: {
                    select: {
                        id: true,
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
                                id: true,
                                name: true,
                                description: true,
                            }
                        },
                    }
                }
            }
        });

        return cocktail;
    }

    async getCocktailsByName(name: string = "") {
        const cocktails = await this.prisma.cocktail.findMany({
            where: {
                OR: [
                    {
                        name: name
                    },
                    {
                        keys: {
                            has: name,
                        }
                    }
                ],
                AND: [
                    {
                        isPublished: true,
                    }
                ]
            },
            select: {
                id: true,
                name: true,
                imageUrl: true,
                rating: true,
                countOfRating: true,
                glassType: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    }
                },
                buildType: {
                    select: {
                        id: true,
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
                                id: true,
                                name: true,
                                description: true,
                            }
                        },
                    }
                }
            }
        });

        return cocktails;
    }

    async updateCocktail(dto: UpdateCocktailDto) {
        // const cocktails = await this.cocktailRepository.update(dto.id , dto);
        // return cocktails;
    }
}
