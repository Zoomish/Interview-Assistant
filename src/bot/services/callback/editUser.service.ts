import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserInfoService } from '../user'

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
                return await this.userInfoService.getProfession()
            case 'skills':
                await bot.answerCallbackQuery(callbackQuery.id, {
                    text: 'Вы выбрали изменить навыки',
                })
                return await this.userInfoService.getSkills()
            case 'level':
                await bot.answerCallbackQuery(callbackQuery.id, {
                    text: 'Вы выбрали изменить уровень',
                })
                return await this.userInfoService.level()
            default:
                break
        }
    }
}
