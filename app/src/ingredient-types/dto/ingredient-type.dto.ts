
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class IngredientTypeDto {
    @ApiProperty({example: '1', description: 'Ingredient type id'})
    @IsString()
    @IsNotEmpty()
    readonly id: number;

    @ApiProperty({example: 'Spirits', description: 'Spirits, Garnish, Basic, Beverages, etc.'})
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @IsString()
    @ApiProperty({example: 'Ingredient type description', description: 'Ingredient type description'})
    readonly description: string;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({example: new Date(), description: 'createdAt'})
    readonly createdAt: Date;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({example: new Date(), description: 'updatedAt'})
    readonly updatedAt: Date;
}