import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { AiStartService } from './ai'

@Injectable()
export class StartinterviewService {
    constructor(private readonly aiStartService: AiStartService) {}
    async startinterview() {
        const bot: TelegramBot = global.bot
        const chatId = global.msg.chat.id
        const chat = await this.aiStartService.getModel()
        const text = await chat.sendMessage('Сколько примитивных типов в js?')
        return await bot.sendMessage(chatId, text.response.text())
    }
}
