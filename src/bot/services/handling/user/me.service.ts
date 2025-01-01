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
            `<b>Профессия:</b> ${user.profession || 'Не указана'}\n` +
            `<b>Уровень:</b> ${user.level || 'Не указан'}\n` +
            `<b>Отзыв:</b> ${user.review || 'Нет'}\n` +
            `<b>Навыки:</b>\n      ${user.skills.join('\n      ')}`
        const reply_markup = {
            inline_keyboard: [
                [
                    {
                        text: 'Изменить профессию',
                        callback_data: 'profession_start',
                    },
                ],
                [
                    {
                        text: 'Изменить навыки',
                        callback_data: 'skills_start',
                    },
                ],
                [
                    {
                        text: 'Изменить уровень',
                        callback_data: 'level',
                    },
                ],
                [
                    {
                        text: user.review ? 'Изменить отзыв' : 'Оставить отзыв',
                        callback_data: user.review
                            ? 'review_edit'
                            : 'review_start',
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
                user.admin
                    ? [
                          {
                              text: 'Получить отзывы',
                              callback_data: 'get_reviews',
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
