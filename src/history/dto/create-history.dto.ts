import { Content } from '@google/generative-ai'
import { IsNotEmpty } from 'class-validator'

export class CreateHistoryDto {
    @IsNotEmpty()
    localhistory: Content[]
}
