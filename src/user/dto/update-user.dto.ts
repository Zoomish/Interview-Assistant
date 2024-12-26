import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import { IsOptional } from 'class-validator'

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    tgId?: number

    @IsOptional()
    nickname?: string
}
