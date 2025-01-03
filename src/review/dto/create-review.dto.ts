import { IsNotEmpty } from 'class-validator'

export class CreateReviewDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    nickname: string

    @IsNotEmpty()
    tgId: number
}
