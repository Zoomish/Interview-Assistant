import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'
import { AiStartService } from './aiStart.service'

@Injectable()
export class GenerateContentService {
    constructor(
        private readonly aiStartService: AiStartService,
        private readonly userService: UserService
    ) {}
    async generateQuetion(text: string) {
        const chat = await this.aiStartService.getModel()
        const bot: TelegramBot = global.bot
        const chatId = global.msg.chat.id
        const generatedText = await chat.sendMessage(text)
        const history = await chat.getHistory()
        await this.userService.update(chatId, {
            localhistory: history,
        })
        return await bot.sendMessage(chatId, generatedText.response.text())
    }
}
