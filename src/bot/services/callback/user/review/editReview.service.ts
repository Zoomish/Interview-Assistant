import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { ReviewService } from 'src/bot/services/handling'

@Injectable()
export class EditReviewService {
    constructor(private readonly reviewService: ReviewService) {}

    async editReview(action: string, id: string) {
        const bot: TelegramBot = global.bot
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
