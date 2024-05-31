import { Body, Controller, Get, Param, Post, Query, Request } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IngredientsService } from './ingredients.service';
import { CreateIngredintDto, IngredientDto } from './dto';

@ApiTags('Ingredient')
@Controller('ingredients')
export class IngredientsController {
    constructor(private readonly ingredientService: IngredientsService) {}

    @ApiOperation({summary: 'Create cocktail'})
    @ApiResponse({status: 200, type: IngredientDto})
    @Post()
    create(@Body() dto: CreateIngredintDto) {
        return this.ingredientService.createIngredient(dto);
    }

    @ApiOperation({summary: 'Get ingredients'})
    @ApiResponse({status: 200, type: [IngredientDto]})
    @Get()
    getAll() {
        return this.ingredientService.getIngredients();
    }

    @ApiOperation({summary: 'Get ingredients by id'})
    @ApiResponse({status: 200, type: [IngredientDto]})
    @Get(":id")
    getById(@Param('id') id: number) {
        return this.ingredientService.getIngredientsById(id);
    }

    // @ApiOperation({summary: 'Get ingredients by type'})
    // @ApiResponse({status: 200, type: [IngredientDto]})
    // @Get()
    // getByType(@Query('ingredientTypeId') ingredientTypeId: number) {
    //     console.log(ingredientTypeId, 'ingredientTypeId');
    //     return this.ingredientService.getIngredientsByType(ingredientTypeId);
    // }
}
