import { Controller, Get, Param } from '@nestjs/common';
import { CocktailsService } from './cocktails.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Cocktails')
@Controller('cocktails')
export class CocktailsController {

    constructor(private readonly cocktailsService: CocktailsService) { }

    @ApiOperation({ summary: 'set favorite cocktail' })
    @ApiResponse({ status: 200, type: [String] })
    @Get("user/:userId/cocktails/:cocktailId")
    setFavorite(@Param('userId') userId: string, @Param('cocktailId') cocktailId: string) {
        return this.cocktailsService.setFavoriteCocktail({ userId: +userId, cocktailId: +cocktailId });
    }

    @ApiOperation({ summary: 'Get all cocktails' })
    @ApiResponse({ status: 200, type: [String] })
    @Get()
    getAll() {
        return this.cocktailsService.getCocktails();
    }

    @ApiOperation({ summary: 'Get all cocktails for search (name and image)' })
    @ApiResponse({ status: 200, type: [String] })
    @Get('main')
    getAllSearch() {
        return this.cocktailsService.getSimplifiedCocktails();
    }

    @ApiOperation({ summary: 'Get cocktails last updated' })
    @ApiResponse({ status: 200, type: [String] })
    @Get("latest/limit/:limit/skip/:skip")
    getLatest(@Param('limit') limit: string, @Param('skip') skip: string) {
        return this.cocktailsService.getSimplifiedLastUpdatedCocktails({ limit: +limit ?? 0, skip: +skip ?? 0 });
    }

    @ApiOperation({ summary: 'Get cocktail by ID' })
    @ApiResponse({ status: 200, type: [String] })
    @Get("users/:userId/cocktails/:id")
    getById(@Param('id') id: string, @Param('userId') userId: string) {
        return this.cocktailsService.getCocktailById({ cocktailId: +id, userId: +userId });
    }

    @ApiOperation({ summary: 'Get cocktails by tag' })
    @ApiResponse({ status: 200, type: [String] })
    @Get("tag/:tag/limit/:limit/skip/:skip")
    getByTag(@Param('tag') tag: string, @Param('limit') limit: string, @Param('skip') skip: string) {
        return this.cocktailsService.getCocktailsByTag(tag, { limit, skip });
    }

    @ApiOperation({ summary: 'Get cocktails by name' })
    @ApiResponse({ status: 200, type: [String] })
    @Get("name/:name")
    getByName(@Param('name') name: string) {
        return this.cocktailsService.getCocktailsByName(name);
    }

    @ApiOperation({ summary: 'get favorite cocktail' })
    @ApiResponse({ status: 200, type: [String] })
    @Get("user/:userId/limit/:limit/skip/:skip")
    getFavoriteCocktails(@Param('userId') userId: string, @Param('limit') limit: string, @Param('skip') skip: string) {
        return this.cocktailsService.getFavoriteCocktails({ userId: +userId, limit: +limit, skip: +skip });
    }

    @ApiOperation({ summary: 'rate cocktail' })
    @ApiResponse({ status: 200, type: [String] })
    @Get("user/:userId/cocktail/:cocktailId/rating/:rating")
    rateCocktail(@Param('userId') userId: string, @Param('cocktailId') cocktailId: string, @Param('rating') rating: string) {
        return this.cocktailsService.rateCocktail({ userId: +userId, cocktailId: +cocktailId, userRating: +rating });
    }
}
