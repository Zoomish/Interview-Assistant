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

    async watchReview(id: number) {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await this.reviewService.update(id, {
            watched: true,
        })
        await bot.sendMessage(id, `Ваш отзыв просмотрен!`)
        return await bot.sendMessage(msg.chat.id, `Вы просмотрели отзыв!`)
    }

    async answerStartReview(id: number) {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await this.watchReview(id)
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
            `На ваш отзыв ответили!\n<b>Ответ:</b>\n` + msg.text
        )
        return await bot.sendMessage(msg.chat.id, `Вы ответили на отзыв!`)
    }

    async getReview() {
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
                                text: 'Просмотреть отзыв',
                                callback_data: `review_watch-${msg.chat.id}`,
                            },
                        ],
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
