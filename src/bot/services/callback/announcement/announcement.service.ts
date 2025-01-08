import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { GlobalAnnouncementService } from '../../handling'

@Injectable()
export class GlobalAnnouncementCallbackService {
    constructor(
        private readonly globalAnnouncementService: GlobalAnnouncementService
    ) {}

    async start(action: string, id: string) {
        const bot: TelegramBot = global.bot
        switch (action) {
            case 'start':
                await bot.answerCallbackQuery(id, {
                    text: `Вы отправляете объявление для всех`,
                })
                return await this.globalAnnouncementService.startAnnouncement()
            case 'end':
                await bot.answerCallbackQuery(id, {
                    text: `Вы отменили отправку объявления`,
                })
                return await this.globalAnnouncementService.endAnnouncement()
            default:
                break
        }
    }
}
