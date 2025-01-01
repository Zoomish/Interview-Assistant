import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { StartinterviewService } from '../../handling'

@Injectable()
export class InterviewService {
    constructor(
        private readonly startinterviewService: StartinterviewService
    ) {}

    async editReview(action: string, id: string) {
        const bot: TelegramBot = global.bot
        switch (action) {
            case 'start':
                await bot.answerCallbackQuery(id, {
                    text: 'Вы выбрали оставить отзыв',
                })
                return await this.startinterviewService.startinterview()
            case 'end':
                await bot.answerCallbackQuery(id, {
                    text: 'Вы отменили действие',
                })
                return await this.startinterviewService.startinterview()
            default:
                break
        }
    }
}
