import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
