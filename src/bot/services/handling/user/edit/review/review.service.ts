import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { ReviewGlobalService } from 'src/review/review.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class ReviewService {
    constructor(
        private readonly userService: UserService,
        private readonly reviewService: ReviewGlobalService
    ) {}

    async startReview() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            startedReview: true,
        })
        await bot.sendMessage(
            msg.chat.id,
            `Отлично! Теперь напишите свой отзыв.`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Отменить',
                                callback_data: 'review_end',
                            },
                        ],
                    ],
                },
            }
        )
    }

    async endReview() {
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            startedReview: false,
        })
    }

    async answerStartReview(id: number) {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await this.reviewService.update(id, {
            watched: true,
        })
        await bot.sendMessage(id, `Ваш отзыв просмотрен!`)
        global.id = id
        return await bot.sendMessage(msg.chat.id, `Напишите ответ на отзыв!`)
    }

    async answerEndReview() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        const id = global.id
        await this.reviewService.update(id, {
            answer: msg.text,
        })
        await bot.sendMessage(
            id,
            `На ваш отзыв ответили!\n<b>Ответ:</b>\n` + msg.text,
            {
                parse_mode: 'HTML',
            }
        )
        return await bot.sendMessage(msg.chat.id, `Вы ответили на отзыв!`)
    }

    async getReview() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        const msgWait = await bot.sendMessage(msg.chat.id, `Получаю данные...`)
        const review = await this.reviewService.findOne(msg.chat.id)
        const text =
            `<b>Меня зовут:</b> ${user.name}\n` +
            `<b>Отзыв:</b> ${review?.text || 'Нет'}\n` +
            `<b>Ответ:</b> ${review?.answer || 'Нет'}\n`
        const reply_markup = {
            inline_keyboard: [
                [
                    {
                        text: review?.text
                            ? 'Изменить отзыв'
                            : 'Оставить отзыв',
                        callback_data: review?.text
                            ? 'review_edit'
                            : 'review_start',
                    },
                ],
            ],
        }
        await bot.deleteMessage(msgWait.chat.id, msgWait.message_id)
        return await bot.sendMessage(msg.chat.id, text, {
            parse_mode: 'HTML',
            reply_markup: reply_markup,
        })
    }

    async newReview() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await this.reviewService.update(msg.chat.id, {
            text: msg.text,
        })
        await this.userService.update(msg.chat.id, {
            startedReview: false,
        })
        const user = await this.userService.findAdmin()
        await bot.sendMessage(
            user.tgId,
            `<b>Новый отзыв!</b>\n` +
                `<b>Пользователь:</b> @` +
                msg.from.username +
                `\n` +
                `<b>Отзыв:</b>\n` +
                msg.text,
            {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Ответить на отзыв',
                                callback_data: `review_answer-${msg.chat.id}`,
                            },
                        ],
                    ],
                },
            }
        )
        return await bot.sendMessage(msg.chat.id, `Данные успешно сохранены!`)
    }
}
