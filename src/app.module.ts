import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CocktailModule } from './cocktails/cocktails.module';
import { IngredientTypesModule } from './ingredient-types/ingredient-types.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    CocktailModule,
    IngredientTypesModule,
    IngredientsModule,
    PrismaModule,
  ],
})
export class AppModule { }
