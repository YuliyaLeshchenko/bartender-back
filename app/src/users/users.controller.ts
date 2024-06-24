import { Body, Controller, Get, Param } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @ApiOperation({summary: 'Create cocktail'})
    @ApiResponse({status: 200, type: String})
    @Get(":appId")
    create(@Param('appId') appId: string) {
        return this.userService.createUser(+appId);
    }
}