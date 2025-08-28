import { Controller,Post,Get,Body,Patch,Param,Query, Delete } from '@nestjs/common';

import {CreateUserDto} from '../users/dtos/createUser.dto';
import {UpdateUserDto} from '../users/dtos/updateUser.dto';
import {UsersService} from './users.service'
@Controller('auth')
export class UsersController {
constructor(private userService: UsersService) {}
    @Post('signup')
    async createUser(@Body() body: CreateUserDto) {
        return this.userService.create(body.email, body.password);
    }
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        return this.userService.findOne(parseInt(id));
    }
    @Get()
    async findAllUsers(@Query('email') email: string) {
        return this.userService.find(email);
    }
    @Patch('/:id')
    async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(parseInt(id), body);
    }
    @Delete('/:id')
    async deleteUser(@Param('id') id: string) {
        return this.userService.remove(parseInt(id));
    }
}
