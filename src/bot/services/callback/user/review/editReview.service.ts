import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserInfoService } from '../../../handling'

@Injectable()
export class EditReviewService {
    constructor(private readonly userInfoService: UserInfoService) {}

    async editReview(action: string, id: string) {
        const bot: TelegramBot = global.bot
        switch (action) {
            case 'start':
                await bot.answerCallbackQuery(id, {
                    text: 'Вы выбрали оставить отзыв',
                })
                return await this.userInfoService.startReview()
            case 'edit':
                await bot.answerCallbackQuery(id, {
                    text: 'Вы выбрали изменить отзыв',
                })
                return await this.userInfoService.startReview()
            case 'end':
                await bot.answerCallbackQuery(id, {
                    text: 'Вы отменили действие',
                })
                return await this.userInfoService.endReview()
            default:
                break
        }
    }
}
