import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { InterviewService } from '../../handling'

@Injectable()
export class InterviewCallbackService {
    constructor(private readonly startinterviewService: InterviewService) {}

    async start(action: string, id: string) {
        const bot: TelegramBot = global.bot
        switch (action) {
            case 'start':
                await bot.answerCallbackQuery(id, {
                    text: 'Вы начали собеседование',
                })
                return await this.startinterviewService.startinterview()
            case 'end':
                await bot.answerCallbackQuery(id, {
                    text: 'Вы закончили собеседование и стерли историю',
                })
                return await this.startinterviewService.endinterview()
            default:
                break
        }
    }
}
