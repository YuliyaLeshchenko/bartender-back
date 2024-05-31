import { Module } from '@nestjs/common';
import { IngredientTypesService } from './ingredient-types.service';
import { IngredientTypesController } from './ingredient-types.controller';

@Module({
  providers: [IngredientTypesService],
  controllers: [IngredientTypesController],
})
export class IngredientTypesModule {}
