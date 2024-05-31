
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class IngredientDto {
    @ApiProperty({example: '1', description: 'Ingredient id'})
    @IsString()
    @IsNotEmpty()
    readonly id: number;

    @ApiProperty({example: 'Dry Gin', description: 'Ingredient name'})
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @IsString()
    @ApiProperty({example: 'Ingredient description', description: 'Ingredient description'})
    readonly description: string;

    @ApiProperty({example: '1', description: 'Ingredient type id'})
    @IsNumber()
    @IsNotEmpty()
    readonly ingredientTypeId: number;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({example: new Date(), description: 'createdAt'})
    readonly createdAt: Date;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({example: new Date(), description: 'updatedAt'})
    readonly updatedAt: Date;

    @ApiProperty({ description: 'ingredient type object', type: IngredientDto })
    readonly ingredintType?: IngredientDto;
}