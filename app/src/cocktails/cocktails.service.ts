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

    async getSimplifiedLastUpdatedCocktails({ limit, skip }) {
        const cocktails = await this.prisma.cocktail.findMany({
            where: {
                isPublished: true,
            },
            select: {
                id: true,
                name: true,
                imageUrl: true,
            },
            orderBy: {
                createdAt: 'desc'
            },
            skip,
            take: limit,
        });

        return cocktails;
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
            },
            orderBy: {
                order: 'asc'
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

        const shownTags = tags.filter(tag => tag.order === 1);
        await Promise.all(shownTags.map(tag => this.getCocktailsByTag(tag.name, { limit: 10, skip: 0 }))).then(res => {
            [...new Set([...res.flat().map(cocktail => cocktail.id)])].map(cocktailId => {
                const cocktail = res.flat().find(c => c.id === cocktailId);
                cocktail && cocktails.push(cocktail);
                return
            });
            return;
        })

        const result = tagTypes.map(tagType => {
            const t = [...tags.filter(tag => tag.tagType.id === tagType.id)];
            return {
                ...tagType,
                tags: t.map(tag => {
                    return {
                        ...tag,
                        cocktails: [...cocktails.filter(cocktail => cocktail.tags.filter(t => t.id === tag.id).length).sort((a, b) => {
                            return new Date(b.createdAt as Date).getTime() - new Date(a.createdAt as Date).getTime();
                        }).map(cocktail => {
                            return {
                                id: cocktail.id,
                                name: cocktail.name,
                                imageUrl: cocktail.imageUrl,
                                tags: cocktail.tags,
                            }
                        })].slice(0, 11),
                    }
                }).sort((a, b) => a.order - b.order)
            }
        }).filter(tagType => tagType.tags.length);
        return result;
    }

    async getCocktailsByTag(tag, { limit, skip }) {
        return this.prisma.cocktail.findMany({
            where: {
                tags: {
                    some: {
                        name: tag
                    }
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
                },
                createdAt: true,
            },
            take: (+limit ?? 10),
            skip: (+skip ?? 0),
            orderBy: {
                createdAt: 'desc'
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

    async getFavoriteCocktails({ userId, limit, skip }) {
        const userCocktails = await this.prisma.user.findFirst({
            where: { appId: userId }, select: {
                userFavorite: {
                    select: {
                        cocktailId: true
                    }
                }
            }
        });
        const cocktailsIds = userCocktails.userFavorite.map(cocktail => cocktail.cocktailId);
        const cocktails = await this.prisma.cocktail.findMany({
            where: {
                id: {
                    in: cocktailsIds,
                }
            },
            select: {
                id: true,
                name: true,
                imageUrl: true,
            }
        })
        return cocktails;
    }

    async getCocktailById({ cocktailId, userId }) {
        const { id } = await this.prisma.user.findFirst({ where: { appId: userId }, select: { id: true } });
        const cocktail = await this.prisma.cocktail.findFirst({
            where: {
                id: +cocktailId,
                isPublished: true,
            },
            select: {
                id: true,
                name: true,
                description: true,
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
                },
                userFavorites: {
                    where: {
                        userId: id,
                        cocktailId: +cocktailId,
                    },
                    select: {
                        cocktailId: true
                    }
                },
                userRatings: {
                    where: {
                        userId: id,
                        cocktailId: +cocktailId,
                    },
                    select: {
                        rating: true,
                    }
                }
            }
        });

        return {...cocktail, rating: (Number(cocktail.rating) ?? 0).toFixed(1)};
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
                description: true,
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

    async setFavoriteCocktail({ userId, cocktailId }) {
        const { id } = await this.prisma.user.findFirst({ where: { appId: +userId }, select: { id: true } });
        const existingFav = await this.prisma.userFavorite.findFirst({ where: { userId: id, cocktailId: +cocktailId } });
        if (existingFav) {
            await this.prisma.userFavorite.delete({
                where: {
                    id: existingFav.id
                }
            })
            return 'was removed';
        }

        await this.prisma.userFavorite.create({
            data: {
                userId: id,
                cocktailId: cocktailId,
            }
        })

        return 'created';
    }

    async rateCocktail({ userId, cocktailId, userRating }) {
        const { id } = await this.prisma.user.findFirst({ where: { appId: userId }, select: { id: true } });
        const { rating, countOfRating } = await this.prisma.cocktail.findFirst({ where: { id: cocktailId }, select: { rating: true, countOfRating: true } });
        const existRating = await this.prisma.userRating.findFirst({ where: { cocktailId: cocktailId, userId: id } });
        if (existRating) {
            const prevRate = (rating * countOfRating) - existRating.rating;
            const uRate = await this.prisma.userRating.update({ where: { id: existRating.id }, data: { rating: userRating } });
            const newRating = (prevRate + +uRate.rating) / countOfRating
            await this.prisma.cocktail.update({ where: { id: cocktailId }, data: { countOfRating: +countOfRating, rating: newRating } });
            return 'rating was updated';
        }

        const uRate = await this.prisma.userRating.create({ data: { cocktailId: cocktailId, userId: id, rating: userRating } });
        const newRating = +rating === 0 ? +uRate.rating : (((+rating ?? 0) * +countOfRating) + +uRate.rating) / (+countOfRating + 1);
        await this.prisma.cocktail.update({ where: { id: cocktailId }, data: { countOfRating: +countOfRating + 1, rating: newRating } });
        return;
    }
}