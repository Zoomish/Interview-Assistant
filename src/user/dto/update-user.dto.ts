import { PartialType } from '@nestjs/mapped-types'
import { IsOptional } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    startedReview?: boolean

    @IsOptional()
    startedAnnouncement?: boolean

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
}
