import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'

@Injectable()
export class LevelService {
    async level() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await bot.sendMessage(
            msg.chat.id,
            `Отлично! Теперь укажите свой уровень.\n\n` +
                '<b>Напоминание:</b> Изменить данные можно с помощью /me, а изменение данных очищает историю.',
            {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Intern (без опыта)',
                                callback_data: 'getlevel_intern',
                            },
                        ],
                        [
                            {
                                text: 'Junior (1-3 года)',
                                callback_data: 'getlevel_junior',
                            },
                        ],
                        [
                            {
                                text: 'Middle (3-6 лет)',
                                callback_data: 'getlevel_middle',
                            },
                        ],
                        [
                            {
                                text: 'Senior (6-10 лет)',
                                callback_data: 'getlevel_senior',
                            },
                        ],
                        [
                            {
                                text: 'Lead (более 10 лет)',
                                callback_data: 'getlevel_lead',
                            },
                        ],
                    ],
                },
            }
        )
    }
}
