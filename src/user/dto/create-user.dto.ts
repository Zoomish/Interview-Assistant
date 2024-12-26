import { IsNotEmpty } from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    nickname: string

    @IsNotEmpty()
    tgId: number
}
