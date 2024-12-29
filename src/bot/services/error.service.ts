import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'

@Injectable()
export class ErrorService {

    async error(error) {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await bot.sendMessage(
            msg.chat.id,
            `Произошла ошибка.\n` + JSON.stringify(error)
        )
    }
}
