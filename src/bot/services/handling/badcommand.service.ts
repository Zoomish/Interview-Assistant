import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'

@Injectable()
export class BadCommandService {
    constructor() {}
    async badUser(chatId) {
        const bot: TelegramBot = global.bot
        await bot.sendMessage(
            chatId,
            `К сожалению у тебя нет доступа к боту. Авторизуйтесь или получите доступ`
        )
    }

    async badCommand() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await bot.sendMessage(
            msg.chat.id,
            `Неизвестная команда. Используйте другую`
        )
    }

    async badQuery() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await bot.sendMessage(
            msg.chat.id,
            `Кнопка устарела и не работает. Попробуйте еще раз или используйте другую`
        )
    }

    async onlyText() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await bot.sendMessage(
            msg.chat.id,
            `Бот не поддерживает другие типы сообщений. Используйте текстовое сообщение`
        )
    }

    async noCommands() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await bot.sendMessage(
            msg.chat.id,
            `Команды бота нельзя использовать в качестве профессии, уровня, навыков. Используйте текстовое сообщение`
        )
    }
}
