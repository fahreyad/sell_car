import { Controller,Post,Get,Body,Patch,Param,Query, Delete, NotFoundException } from '@nestjs/common';

import {CreateUserDto} from '../users/dtos/createUser.dto';
import {UpdateUserDto} from '../users/dtos/updateUser.dto';
import {UsersService} from './users.service';
import { Serialization } from 'src/interceptor/serialization.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
@Controller('auth')
@Serialization(UserDto)
export class UsersController {
    constructor(private userService: UsersService,
        private authService: AuthService
    ) {}
    @Post('signup')
    async createUser(@Body() body: CreateUserDto) {
        return this.authService.signup(body.email, body.password);
    }

    @Post('signin')
    async loginUser(@Body() body: CreateUserDto) {
        return this.authService.signin(body.email, body.password);
    }
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.userService.findOne(parseInt(id));
        if (!user) throw new NotFoundException('User not found');
        return user;
    }
    @Get()
    async findAllUsers(@Query('email') email: string) {
        return this.userService.find(email);
    }
    @Patch('/:id')
    async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        const user = await this.userService.update(parseInt(id), body);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }
    @Delete('/:id')
    async deleteUser(@Param('id') id: string) {
        const user = await this.userService.remove(parseInt(id));
        if (!user) throw new NotFoundException('User not found');
        return user;
    }
}
