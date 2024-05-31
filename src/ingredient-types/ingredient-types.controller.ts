import { Body, Controller, Get, Post } from '@nestjs/common';
import { IngredientTypesService } from './ingredient-types.service';
import { CreateIngredientTypeDto, IngredientTypeDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Ingredient type')
@Controller('ingredient-types')
export class IngredientTypesController {
    constructor(private readonly ingredientTypesService: IngredientTypesService) { }

    @ApiOperation({summary: 'Create cocktail'})
    @ApiResponse({status: 200, type: IngredientTypeDto})
    @Post()
    create(@Body() dto : CreateIngredientTypeDto) {
        return this.ingredientTypesService.createIngredientType(dto);
    }

    @ApiOperation({summary: 'Get ingredient types'})
    @ApiResponse({status: 200, type: [IngredientTypeDto]})
    @Get()
    getAll() {
        return this.ingredientTypesService.getAllIngredientTypes();
    }


}
