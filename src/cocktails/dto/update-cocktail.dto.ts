import { ApiProperty } from "@nestjs/swagger";

export class UpdateCocktailDto {
    @ApiProperty({example: '1', description: 'Cocktail id', required: true})
    readonly id: number;

    @ApiProperty({example: 'Old fashion', description: 'Cocktail name'})
    readonly name: string;
    
    @ApiProperty({example: 'Cocktail description', description: 'Cocktail description'})
    readonly description: string;
}