import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'

@Injectable()
export class EveryDayStartMessageService {
    async start(chatId) {
        const bot: TelegramBot = global.bot
        await bot.sendMessage(
            chatId,
            `Отправь сообщения/гоолсовое сообщение/видеосообщение для других пользователей ответом на это сообщение`
        )
    }
}
