import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { User } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service'

@Injectable()
export class MeService {
    constructor(private readonly userService: UserService) {}
    async getMe(msg: TelegramBot.Message, user: User) {
        const bot: TelegramBot = global.bot
        const text =
            `<b>Меня зовут:</b> ${user.name}\n` +
            `${user.admin ? '<b>Я админ</b>\n' : ''}` +
            `<b>Профессия:</b> ${user.profession || 'Не указана'}\n` +
            `<b>Уровень:</b> ${user.level || 'Не указан'}\n` +
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
                        text: 'Мой отзыв',
                        callback_data: 'review_get',
                    },
                ],
                user.admin
                    ? [
                          {
                              text: 'Все пользователи',
                              callback_data: 'get_users',
                          },
                          {
                              text: 'Все отзывы',
                              callback_data: 'get_reviews',
                          },
                      ]
                    : [],
                user.admin
                    ? [
                          {
                              text: 'Отправить объявление',
                              callback_data: 'announcement_start',
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
