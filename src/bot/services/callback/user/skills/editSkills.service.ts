import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { SkillsService } from 'src/bot/services/handling'

@Injectable()
export class EditSkillsService {
    constructor(private readonly skillsService: SkillsService) {}
    async start(action: string, id: string) {
        const bot: TelegramBot = global.bot
        switch (action) {
            case 'start':
                await bot.answerCallbackQuery(id, {
                    text: 'Вы выбрали изменить навыки',
                })
                return await this.skillsService.startSkills()
            case 'end':
                await bot.answerCallbackQuery(id, {
                    text: 'Вы отменили изменение навыков',
                })
                return await this.skillsService.endSkills()
        }
    }
}
