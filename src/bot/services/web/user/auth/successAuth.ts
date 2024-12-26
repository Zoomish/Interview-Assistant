import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'

@Injectable()
export class SuccessAuthService {
    constructor() {}
    async successAuth() {
        const bot: TelegramBot = global.bot
        const chatId = global.msg.chat.id
        await bot.sendMessage(chatId, `Ты успешно вошла в аккаунт!`, {
            reply_markup: {
                remove_keyboard: true,
            },
        })
    }

    async setTgId() {
        const bot: TelegramBot = global.bot
        const chatId = global.msg.chat.id
        await bot.sendMessage(
            chatId,
            `Ты успешно привязала телеграм к аккаунту!`
        )
    }
}
