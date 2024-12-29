import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'

@Injectable()
export class InfoService {
    async info(chatId) {
        const bot: TelegramBot = global.bot
        await bot.sendMessage(
            chatId,
            `Все команды бота\n\n${(await bot.getMyCommands()).map((el) => `/${el.command} - ${el.description}`).join('\n\n')}`
        )
    }
}
