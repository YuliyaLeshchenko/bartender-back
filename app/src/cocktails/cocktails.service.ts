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

    async getSimplifiedCocktails() {
        let cocktails = [];
        const tagTypes = await this.prisma.tagType.findMany({
            where: {
                isShown: true,
            },
            select: {
                id: true,
                order: true,
                name: true,
            }
        })
        const tags = await this.prisma.tag.findMany({
            where: {
                isShown: true,
            }, select: {
                id: true,
                order: true,
                name: true,
                tagType: {
                    select: {
                        id: true,
                        order: true,
                        name: true,
                    }
                }
            }
        });

        const shownTags = tags.filter(tag => tag.order === 1)

        await Promise.all(shownTags.map(tag => this.getCocktailsByTag(tag))).then(res => {
            cocktails = res.flat();
            return;
        })

        const result = tagTypes.map(tagType => {
            const t = [...tags.filter(tag => tag.tagType.id === tagType.id)];
            return {
                ...tagType,
                tags: t.map(tag => {
                    return {
                        ...tag,
                        cocktails: [...cocktails.filter(cocktail => cocktail.tags.filter(t => t.id === tag.id).length)],
                    }
                })
                    .filter(tag => tag.cocktails.length).sort((a, b) => a.order - b.order)
            }
        }).filter(tagType => tagType.tags.length);
        return result;
    }

    async getCocktailsByTag(tag) {
        return this.prisma.cocktail.findMany({
            where: {
                tags: {
                    some: tag
                },
                isPublished: true,
            },
            select: {
                id: true,
                name: true,
                imageUrl: true,
                tags: {
                    select: {
                        id: true,
                        name: true,
                        order: true,
                    }
                }
            }
        })
    }

    async getCocktails(): Promise<any[]> {
        const cocktails = await this.prisma.cocktail.findMany({
            where: {
                isPublished: true,
            },
            select: {
                id: true,
                name: true,
                description: true,
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
                        name: {
                            contains: name,
                            mode: 'insensitive'
                        }
                    },
                    {
                        keys: {
                            has: name.toLowerCase(),
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
