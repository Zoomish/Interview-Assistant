import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'

@Injectable()
export class EditLevelService {
    async level() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await bot.sendMessage(
            msg.chat.id,
            `Отлично! Теперь укажите свой уровень.`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Intern (без опыта)',
                                callback_data: 'level_intern',
                            },
                        ],
                        [
                            {
                                text: 'Junior (1-3 года)',
                                callback_data: 'level_junior',
                            },
                        ],
                        [
                            {
                                text: 'Middle (3-6 лет)',
                                callback_data: 'level_middle',
                            },
                        ],
                        [
                            {
                                text: 'Senior (6-10 лет)',
                                callback_data: 'level_senior',
                            },
                        ],
                        [
                            {
                                text: 'Lead (более 10 лет)',
                                callback_data: 'level_lead',
                            },
                        ],
                    ],
                },
            }
        )
    }
}
