import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { ReviewGlobalService } from 'src/review/review.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class GetInfoService {
    constructor(
        private readonly userService: UserService,
        private readonly reviewService: ReviewGlobalService
    ) {}

    async start(action: string, id: string) {
        switch (action) {
            case 'users':
                return await this.getUsers(id)
            case 'reviews':
                return await this.getReviews(id)
            default:
                break
        }
    }
    async getUsers(id: string) {
        const bot: TelegramBot = global.bot
        const chatId = global.msg.chat.id
        await bot.answerCallbackQuery(id, {
            text: `Вы получаете всех пользователей`,
        })
        const users = await this.userService.findAll()
        if (users.length === 0) {
            await bot.sendMessage(chatId, 'Нет ни одного пользователя в базе.')
            return
        }
        await bot.sendMessage(
            chatId,
            `<b>Список всех пользователей (${users.length}):</b>`,
            {
                parse_mode: 'HTML',
            }
        )
        users.forEach(async (user) => {
            const messgase =
                user?.localhistory?.length > 0
                    ? Math.floor(user.localhistory.length / 2).toString()
                    : '0'
            await bot.sendChatAction(chatId, 'typing')
            await bot.sendMessage(
                chatId,
                '<b>Id:</b> ' +
                    user.tgId.toString() +
                    '\n<b>Ник:</b> ' +
                    '@' +
                    user.nickname +
                    '\n<b>Сообщения:</b> ' +
                    messgase +
                    '\n<b>Имя:</b> ' +
                    user.name +
                    '\n<b>Профессия:</b> ' +
                    user.profession +
                    '\n<b>Уровень:</b> ' +
                    user.level,
                {
                    parse_mode: 'HTML',
                }
            )
        })
    }

    async getReviews(id: string) {
        const bot: TelegramBot = global.bot
        const chatId = global.msg.chat.id
        await bot.answerCallbackQuery(id, {
            text: `Вы получаете все отзывы`,
        })
        const reviews = await this.reviewService.findAll()
        if (reviews.length === 0) {
            await bot.sendMessage(chatId, 'Нет ни одного отзыва в базе.')
            return
        }
        await bot.sendMessage(
            chatId,
            `<b>Список всех отзывов (${reviews.length}):</b>`,
            {
                parse_mode: 'HTML',
            }
        )
        reviews.forEach(async (review, i) => {
            await bot.sendChatAction(chatId, 'typing')
            await bot.sendMessage(
                chatId,
                `<b>Пользователь ${i + 1}:</b>` +
                    '\n<b>Ник:</b> ' +
                    '@' +
                    review.user.nickname +
                    '\n<b>Отзыв:</b> ' +
                    review.text +
                    '\n<b>Ответ:</b> ' +
                    review.answer || 'Нет',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: review.answer
                                        ? 'Изменить ответ'
                                        : 'Ответить на отзыв',
                                    callback_data: `review_answer-${review.user.tgId}`,
                                },
                            ],
                        ],
                    },
                }
            )
        })
    }
}
