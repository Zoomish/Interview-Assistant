import { Content } from '@google/generative-ai'
import { PartialType } from '@nestjs/mapped-types'
import { IsOptional } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    profession?: string

    @IsOptional()
    review?: string

    @IsOptional()
    startedReview?: boolean

    @IsOptional()
    startedInterview?: boolean

    @IsOptional()
    level?: 'Intern' | 'Junior' | 'Middle' | 'Senior' | 'Lead'

    @IsOptional()
    skills?: string[]

    @IsOptional()
    localhistory?: Content[]
}
