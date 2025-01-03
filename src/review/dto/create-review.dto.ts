import { IsNotEmpty } from 'class-validator'

export class CreateReviewDto {
    @IsNotEmpty()
    text: string
}
