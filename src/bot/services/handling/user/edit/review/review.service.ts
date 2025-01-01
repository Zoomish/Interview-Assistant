import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'

@Injectable()
export class ReviewService {
    constructor(private readonly userService: UserService) {}

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

    async getReview() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            review: msg.text,
            startedReview: false,
        })
        return await bot.sendMessage(msg.chat.id, `Данные успешно сохранены!`)
    }
}
