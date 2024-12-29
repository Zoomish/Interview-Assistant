import { Content } from '@google/generative-ai'
import { PartialType } from '@nestjs/mapped-types'
import { IsOptional } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    profession?: string

    @IsOptional()
    level?: 'Junior' | 'Middle' | 'Senior'

    @IsOptional()
    skills?: string[]

    @IsOptional()
    localhistory?: Content[]
}
