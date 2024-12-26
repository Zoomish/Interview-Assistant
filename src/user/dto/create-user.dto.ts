import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    nickname: string

    @IsOptional()
    image?:string

    @IsNotEmpty()
    tgId: number
}
