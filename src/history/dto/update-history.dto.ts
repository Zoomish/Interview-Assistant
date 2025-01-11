import { Content } from '@google/generative-ai'
import { PartialType } from '@nestjs/mapped-types'
import { IsOptional } from 'class-validator'
import { CreateHistoryDto } from './create-history.dto'

export class UpdateHistoryDto extends PartialType(CreateHistoryDto) {
    @IsOptional()
    localhistory?: Content[]

    @IsOptional()
    globalhistory?: Content[][]
}
