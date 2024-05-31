
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateIngredientTypeDto {

    @ApiProperty({example: 'Spirits', description: 'Spirits, Garnish, Basic, Beverages, etc.'})
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @IsString()
    @ApiProperty({example: 'Ingredient type description', description: 'Ingredient type description'})
    readonly description: string;
}