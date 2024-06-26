import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IngredientsService } from './ingredients.service';

@ApiTags('Ingredient')
@Controller('ingredients')
export class IngredientsController {
    constructor(private readonly ingredientService: IngredientsService) {}
    @ApiOperation({summary: 'Get ingredients'})
    @ApiResponse({status: 200, type: [String]})
    @Get()
    getAll() {
        return this.ingredientService.getIngredients();
    }

    @ApiOperation({summary: 'Get ingredients by id'})
    @ApiResponse({status: 200, type: [String]})
    @Get(":id")
    getById(@Param('id') id: number) {
        return this.ingredientService.getIngredientsById(id);
    }
}
