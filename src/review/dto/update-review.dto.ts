import { Content } from '@google/generative-ai'
import { PartialType } from '@nestjs/mapped-types'
import { IsOptional } from 'class-validator'
import { CreateUserDto } from './create-review.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    review?: string

    @IsOptional()
    startedReview?: boolean

    @IsOptional()
    startedInterview?: boolean

    @IsOptional()
    professionExist?: boolean

    @IsOptional()
    profession?: string

    @IsOptional()
    level?: 'Intern' | 'Junior' | 'Middle' | 'Senior' | 'Lead'

    @IsOptional()
    skillsExist?: boolean

    @IsOptional()
    skills?: string[]

    @IsOptional()
    localhistory?: Content[]
}
