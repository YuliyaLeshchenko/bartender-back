import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllPosts({ limit = 10, skip = 0 }) {
        const posts = await this.prisma.post.findMany(
            {
                where: {
                    isShown: true,
                },
                skip,
                take: limit
            }
        );
        return posts;
    }

    async getPostsLatest(skipPinned = false, { limit = 10, skip = 0}) {
        const posts = await this.prisma.post.findMany({
            where: {
                isShown: true,
                pinned: !skipPinned,
            },
            select: {
                id: true,
                title: true,
                image: true,
                tags: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                sections: {
                    select: {
                        id: true,
                        type: true,
                        text: true,
                    },
                    orderBy: {
                        order: 'asc'
                    }
                }
            },
            take: limit,
            skip,
            orderBy: {
                createdAt: 'desc'
            }
        });

        return posts;
    }

    async getPostsByTag(tag, { limit = 10, skip = 0}) {
        const posts = await this.prisma.post.findMany({
            where: {
                isShown: true,
                tags: {
                    some: {
                        name: tag
                    }
                },
            },
            select: {
                id: true,
                title: true,
                image: true,
                tags: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                sections: {
                    select: {
                        id: true,
                        type: true,
                        text: true,
                    },
                    orderBy: {
                        order: 'asc'
                    }
                }
            },
            take: limit,
            skip,
        });

        return posts;
    }

    async getPostsPinned() {
        const posts = await this.prisma.post.findMany({
            where: {
                pinned: true,
            },
            select: {
                id: true,
                title: true,
                image: true,
                tags: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                sections: {
                    select: {
                        id: true,
                        type: true,
                        text: true,
                    },
                    orderBy: {
                        order: 'asc'
                    }
                }
            },
            take: 3,
            orderBy: {
                createdAt: 'desc'
            }
        });

        return posts;
    }

    async getPostsMain() {
        const pinned = await this.getPostsPinned();
        const postTags = await this.prisma.postTag.findMany({
            where: {
                isShown: true,
            },
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                order: 'asc'
            }
        });
        if (postTags.length === 0) return 'failed';

        const posts = await this.getPostsLatest(true,{limit: 10, skip: 0});

        const tags = postTags.map((tag, index) => {
            return {
                tag: tag,
                posts: []
            }
        });
        tags.unshift({tag: {id: 0, name: 'Other'}, posts})

        return {
            pinned,
            tags,
        }
    }
}