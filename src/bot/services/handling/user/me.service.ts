import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'

@Injectable()
export class MeService {
    constructor(private readonly userService: UserService) {}
    async getMe(msg: TelegramBot.Message) {
        const bot: TelegramBot = global.bot
        const msgWait = await bot.sendMessage(msg.chat.id, `Получаю данные...`)
        const user = await this.userService.findOne(msg.chat.id)
        await bot.deleteMessage(msgWait.chat.id, msgWait.message_id)
        const text =
            `<b>Меня зовут:</b> ${user.name}\n` +
            `${user.admin ? '<b>Я админ</b>\n' : ''}` +
            `<b>Профессия:</b> ${user.profession}\n` +
            `<b>Уровень:</b> ${user.level}\n` +
            `<b>Отзыв:</b> ${user.review || 'Нет'}\n` +
            `<b>Навыки:</b>\n      ${user.skills.join('\n      ')}`
        const reply_markup = {
            inline_keyboard: [
                [
                    {
                        text: 'Изменить профессию',
                        callback_data: 'edit_profession',
                    },
                ],
                [
                    {
                        text: 'Изменить навыки',
                        callback_data: 'edit_skills',
                    },
                ],
                [
                    {
                        text: 'Изменить уровень',
                        callback_data: 'edit_level',
                    },
                ],
                [
                    {
                        text: user.review ? 'Изменить отзыв' : 'Оставить отзыв',
                        callback_data: 'edit_review',
                    },
                ],
                user.admin
                    ? [
                          {
                              text: 'Получить пользователей',
                              callback_data: 'get_users',
                          },
                      ]
                    : [],
            ],
        }
        return await bot.sendMessage(msg.chat.id, text, {
            parse_mode: 'HTML',
            reply_markup: reply_markup,
        })
    }
}
