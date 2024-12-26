import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'
import { StartinterviewService } from './startInterview.service'

@Injectable()
export class CallbackService {
    constructor(
        private readonly userService: UserService,
        private readonly startinterviewService: StartinterviewService
    ) {}
    async callback(callbackQuery) {
        const action = callbackQuery.data
        const msg = callbackQuery.message
        switch (action) {
            case 'junior':
                return await this.editUser('Junior', msg)
            case 'middle':
                return await this.editUser('Middle', msg)
            case 'senior':
                return await this.editUser('Senior', msg)
            case 'startinterview':
                return await this.startinterviewService.startinterview()
            default:
                break
        }
    }

    private async editUser(
        text: 'Junior' | 'Middle' | 'Senior',
        msg: TelegramBot.Message
    ) {
        const bot: TelegramBot = global.bot
        await this.userService.update(msg.chat.id, {
            level: text,
        })
        await bot.sendMessage(msg.chat.id, `Спасибо! Теперь можно начинать!`, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Начать собеседование',
                            callback_data: 'startinterview',
                        },
                    ],
                ],
            },
        })
    }
}
