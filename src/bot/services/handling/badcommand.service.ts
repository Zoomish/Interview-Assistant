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

    async alreadyStarted() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await bot.sendMessage(
            msg.chat.id,
            `Вы уже начали собеседование. Остановите его и сбросьте историю или используйте другую команду`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Остановить собеседование',
                                callback_data: 'interview_end',
                            },
                        ],
                    ],
                },
            }
        )
    }

    async notStarted() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await bot.sendMessage(
            msg.chat.id,
            `Вы не начали собеседование. Начните его или используйте другую команду`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Начать собеседование',
                                callback_data: 'interview_start',
                            },
                        ],
                    ],
                },
            }
        )
    }

    async exist() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await bot.sendMessage(
            msg.chat.id,
            `Вы уже зарегестрированы в боте. Остановите собеседование и сбросьте историю или используйте другую команду`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Остановить собеседование',
                                callback_data: 'interview_end',
                            },
                        ],
                    ],
                },
            }
        )
    }

    async badText() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await bot.sendMessage(
            msg.chat.id,
            'Вы не начали собеседование или изменили информацию о себе. Начните его или используйте другую команду',
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Начать собеседование',
                                callback_data: 'interview_start',
                            },
                        ],
                    ],
                },
            }
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
