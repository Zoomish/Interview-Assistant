import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { AiStartService } from './aiStart.service'

@Injectable()
export class GenerateContentService {
    constructor(private readonly aiStartService: AiStartService) {}
    async generateQuetion() {
        const model = await this.aiStartService.getModel()
        const bot: TelegramBot = global.bot
        const chatId = global.msg.chat.id
        const text = await model.generateContent(
            'Сколько примитивных типов в js?'
        )
        return await bot.sendMessage(chatId, text.response.text())
    }
}
