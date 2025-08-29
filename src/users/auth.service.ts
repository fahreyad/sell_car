import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes,scrypt as _scrypt } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService{
    constructor(private userService: UsersService) {}

    async signup(email: string, password: string) {
        //check the email
        const existingUser = await this.userService.find(email);

        if (existingUser.length > 0) {
            throw new BadRequestException('Email already in use');
        }
        //salt of the password
        const salt = randomBytes(8).toString('hex');
        const hashedPassword = (await scrypt(password, salt, 32)) as Buffer;
        const  result = salt + '.' + hashedPassword.toString('hex');
        //create a user 
        const user = await this.userService.create(email, result);
        return user;
    }

    async signin(email: string, password: string) {
        const [user] = await this.userService.find(email);
        if (!user) {
            throw new BadRequestException('User not found');
        }
        const [salt, storedHash] = user.password.split('.');
        const hashedPassword = (await scrypt(password, salt, 32)) as Buffer;
        if (storedHash !== hashedPassword.toString('hex')) {
            throw new BadRequestException('Invalid credentials');
        }
        return user;
    }
}