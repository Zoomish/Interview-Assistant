import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserInfoService } from 'src/bot/services/handling'

@Injectable()
export class EditProfessionService {
    constructor(private readonly userInfoService: UserInfoService) {}
    async start(action: string, id: string) {
        const bot: TelegramBot = global.bot
        switch (action) {
            case 'start':
                await bot.answerCallbackQuery(id, {
                    text: 'Вы выбрали изменить профессию',
                })
                return await this.userInfoService.startProfession()
            case 'end':
                return await this.userInfoService.endProfession()
        }
    }
}
