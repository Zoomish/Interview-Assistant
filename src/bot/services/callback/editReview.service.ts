import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserInfoService } from '../handling'

@Injectable()
export class EditReviewService {
    constructor(private readonly userInfoService: UserInfoService) {}

    async editReview(action: string, id: string) {
        const bot: TelegramBot = global.bot
        switch (action) {
            case 'start':
                await bot.answerCallbackQuery(id, {
                    text: 'Вы выбрали изменить профессию',
                })
                return await this.userInfoService.sendProfession()
            case 'end':
                await bot.answerCallbackQuery(id, {
                    text: 'Вы выбрали изменить навыки',
                })
                return await this.userInfoService.sendSkills()
            case 'review':
                await bot.answerCallbackQuery(id, {
                    text: 'Вы выбрали изменить отзыв',
                })
                return await this.userInfoService.sendReview()
            default:
                break
        }
    }
}
