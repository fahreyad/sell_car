import {IsEmail,IsOptional,IsString} from 'class-validator'
export class UpdateUserDto {
    @IsEmail()
    @IsString()
    @IsOptional()
    email: string;
}
