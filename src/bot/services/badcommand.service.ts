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

    async badServer(type: 'Start' | 'Interview') {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await bot.sendMessage(
            msg.chat.id,
            `К сожалению сервер перезапускался, и я не могу понять на какой вопрос ты отвечал. ${type === 'Start' ? 'Ответь на вопрос еще раз' : 'Начни собеседование заново'}`
        )
    }
}
