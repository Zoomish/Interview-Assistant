import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { AiStartService } from './ai'

@Injectable()
export class StartinterviewService {
    constructor(private readonly aiStartService: AiStartService) {}
    async startinterview() {
        const bot: TelegramBot = global.bot
        const chatId = global.msg.chat.id
        const model = await this.aiStartService.getModel()
        const chat = model.startChat()
        console.log(chat)
        const text = await model.generateContent(
            'Сколько примитивных типов в js?'
        )
        return await bot.sendMessage(chatId, text.response.text())
    }
}
