import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
    @IsEmail()
    email: string

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string
}
