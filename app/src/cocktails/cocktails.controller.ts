import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { CocktailsService } from './cocktails.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Cocktails')
@Controller('cocktails')
export class CocktailsController {

    constructor(private readonly cocktailsService: CocktailsService) {}
     
    @ApiOperation({summary: 'Create cocktail'})
    @ApiResponse({status: 200, type: String})
    @Post()
    create(@Body() cocktailDto: CreateCocktailDto) {
        return this.cocktailsService.createCocktail(cocktailDto);
    }

    @ApiOperation({summary: 'Get all cocktails'})
    @ApiResponse({status: 200, type: [String]})
    @Get()
    getAll() {
        return this.cocktailsService.getCocktails();
    }

    @ApiOperation({summary: 'Get all cocktails for search (name and image)'})
    @ApiResponse({status: 200, type: [String]})
    @Get('search')
    getAllSearch() {
        return this.cocktailsService.getSimplifiedCocktails();
    }

    @ApiOperation({summary: 'Get cocktail by ID'})
    @ApiResponse({status: 200, type: [String]})
    @Get(":id")
    getById(@Param('id') id: number) {
        return this.cocktailsService.getCocktailById(id);
    }

    @ApiOperation({summary: 'Get cocktails by tag'})
    @ApiResponse({status: 200, type: [String]})
    @Get("tag/:tag")
    getByTag(@Param('tag') tag: string) {
        return this.cocktailsService.getCocktailsByTag(tag);
    }

    @ApiOperation({summary: 'Get cocktails by name'})
    @ApiResponse({status: 200, type: [String]})
    @Get("name/:name")
    getByName(@Param('name') name: string) {
        return this.cocktailsService.getCocktailsByName(name);
    }
}
