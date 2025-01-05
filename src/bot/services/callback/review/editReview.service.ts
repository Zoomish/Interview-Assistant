import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { ReviewService } from 'src/bot/services/handling'

@Injectable()
export class EditReviewService {
    constructor(private readonly reviewService: ReviewService) {}

    async editReview(data: string, id: string) {
        const bot: TelegramBot = global.bot
        data = data.trim()
        const action = data.split('-')[0]
        const reviewId = Number(
            data.split('-').length > 1 ? data.split('-')[1] : data
        )
        switch (action) {
            case 'start':
                await bot.answerCallbackQuery(id, {
                    text: 'Вы выбрали оставить отзыв',
                })
                return await this.reviewService.startReview()
            case 'edit':
                await bot.answerCallbackQuery(id, {
                    text: 'Вы выбрали изменить отзыв',
                })
                return await this.reviewService.startReview()
            case 'answer':
                await bot.answerCallbackQuery(id, {
                    text: 'Вы выбрали ответить на отзыв',
                })
                return await this.reviewService.answerStartReview(reviewId)
            case 'end':
                await bot.answerCallbackQuery(id, {
                    text: 'Вы отменили действие',
                })
                return await this.reviewService.endReview()
            default:
                break
        }
    }
}
