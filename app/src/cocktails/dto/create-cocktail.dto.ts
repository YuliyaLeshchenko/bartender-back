import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCocktailDto {

    @ApiProperty({example: 'Old fashion', description: 'Cocktail name'})
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @ApiProperty({example: 'Cocktail description', description: 'Cocktail description'})
    @IsNotEmpty()
    readonly description: string;
}