import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { AiStartService } from './ai'

@Injectable()
export class StartinterviewService {
    constructor(private readonly aiStartService: AiStartService) {}
    async startinterview() {
        const bot: TelegramBot = global.bot
        const chatId = global.msg.chat.id
        await bot.sendMessage(
            chatId,
            `Все команды бота\n\n${(await bot.getMyCommands()).map((el) => `/${el.command} - ${el.description}`).join('\n\n')}`
        )
    }
}
