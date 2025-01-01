import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserInfoService } from '../handling'

@Injectable()
export class EditUserService {
    constructor(private readonly userInfoService: UserInfoService) {}

    async editUser(action, callbackQuery) {
        const bot: TelegramBot = global.bot
        switch (action) {
            case 'profession':
                await bot.answerCallbackQuery(callbackQuery.id, {
                    text: 'Вы выбрали изменить профессию',
                })
                return await this.userInfoService.sendProfession()
            case 'skills':
                await bot.answerCallbackQuery(callbackQuery.id, {
                    text: 'Вы выбрали изменить навыки',
                })
                return await this.userInfoService.sendSkills()
            case 'level':
                await bot.answerCallbackQuery(callbackQuery.id, {
                    text: 'Вы выбрали изменить уровень',
                })
                return await this.userInfoService.level()
            case 'review':
                await bot.answerCallbackQuery(callbackQuery.id, {
                    text: 'Вы выбрали изменить отзыв',
                })
                return await this.userInfoService.sendReview()
            default:
                break
        }
    }
}
