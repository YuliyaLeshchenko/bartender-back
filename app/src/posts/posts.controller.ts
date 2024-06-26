import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @ApiOperation({ summary: 'Get all posts' })
    @ApiResponse({ status: 200, type: [String] })
    @Get("/all/limit/:limit/skip/:skip")
    getAll(@Param('skip') skip: string, @Param('limit') limit: string,) {
        return this.postsService.getAllPosts({ limit: +limit, skip: +skip });
    }

    @ApiOperation({ summary: 'Get posts by tag' })
    @ApiResponse({ status: 200, type: [String] })
    @Get("/tag/:tag/limit/:limit/skip/:skip")
    getPostsByTag(@Param('tag') tag: string, @Param('skip') skip: string, @Param('limit') limit: string,) {
        return this.postsService.getPostsByTag(tag, {limit: +limit, skip: +skip });
    }

    @ApiOperation({ summary: 'Get posts by latest' })
    @ApiResponse({ status: 200, type: [String] })
    @Get("/pinned")
    getPostsByLatest() {
        return this.postsService.getPostsPinned();
    }

    @ApiOperation({ summary: 'Get main posts' })
    @ApiResponse({ status: 200, type: [String] })
    @Get("/main")
    getPostsMain() {
        return this.postsService.getPostsMain();
    }
}

