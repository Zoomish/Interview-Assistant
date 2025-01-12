import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { HistoryService } from 'src/bot/services/handling'

@Injectable()
export class HistoryCallbackService {
    constructor(private readonly historyService: HistoryService) {}

    async getHistory(data: string, id: string) {
        const bot: TelegramBot = global.bot
        data = data.trim()
        const action = data.split('-')[0]
        const historyId = Number(
            data.split('-').length > 1 ? data.split('-')[1] : data
        )
        switch (action) {
            case 'getall':
                await bot.answerCallbackQuery(id, {
                    text: 'Вы получаете свою историю',
                })
                return await this.historyService.getGlobalHistory()
            case 'get':
                await bot.answerCallbackQuery(id, {
                    text: 'Вы получаете запись из истории',
                })
                return await this.historyService.getArcticle(historyId)
            default:
                break
        }
    }
}
