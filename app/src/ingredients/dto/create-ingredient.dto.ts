
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateIngredintDto {

    @ApiProperty({example: 'Dry Gin', description: 'Ingredient name'})
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @IsString()
    @ApiProperty({example: 'Ingredient description', description: 'Ingredient description'})
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example: 1, description: 'Ingredient type id'})
    readonly ingredientTypeId: number;
}