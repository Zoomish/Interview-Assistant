import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { ProfessionService } from 'src/bot/services/handling'

@Injectable()
export class EditProfessionService {
    constructor(private readonly professionService: ProfessionService) {}
    async start(action: string, id: string) {
        const bot: TelegramBot = global.bot
        switch (action) {
            case 'start':
                await bot.answerCallbackQuery(id, {
                    text: 'Вы выбрали изменить профессию',
                })
                return await this.professionService.startProfession()
            case 'end':
                await bot.answerCallbackQuery(id, {
                    text: 'Вы отменили изменение профессии',
                })
                return await this.professionService.endProfession()
        }
    }
}
