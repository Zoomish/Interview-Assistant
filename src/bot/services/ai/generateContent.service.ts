import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { AiStartService } from './aiStart.service'

@Injectable()
export class GenerateContentService {
    constructor(private readonly aiStartService: AiStartService) {}
    async generateQuetion(text: string) {
        const model = await this.aiStartService.getModel()
        const bot: TelegramBot = global.bot
        const chatId = global.msg.chat.id
        const generatedText = await model.sendMessage(text)
        return await bot.sendMessage(chatId, generatedText.response.text())
    }
}
