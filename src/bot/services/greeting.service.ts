import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'

@Injectable()
export class GreetingService {
    constructor() {}
    async greeting(chatId, msg) {
        const bot: TelegramBot = global.bot
        await bot.sendMessage(
            chatId,
            `Привет, ${msg?.chat?.first_name}! Этого бота я делал как дополнение к подарку, так что надеюсь он тебе понравится)`
        )
        await bot.sendMessage(
            chatId,
            `Для того чтобы продолжить зайди пожалуйста в аккаунт)`,
            {
                reply_markup: {
                    keyboard: [
                        [
                            {
                                text: 'Войти в аккаунт',
                                web_app: {
                                    url: process.env.URL,
                                },
                            },
                        ],
                    ],
                },
            }
        )
    }
}
