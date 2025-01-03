import { PartialType } from '@nestjs/mapped-types'
import { IsOptional } from 'class-validator'
import { CreateReviewDto } from './create-review.dto'

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
    @IsOptional()
    text?: string

    @IsOptional()
    answerStarted?: boolean

    @IsOptional()
    watched?: boolean

    @IsOptional()
    answer?: string
}
