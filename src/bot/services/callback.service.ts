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
    async callback(callbackQuery: TelegramBot.CallbackQuery) {
        const action = callbackQuery.data
        const msg = callbackQuery.message
        global.msg = msg
        switch (action) {
            case 'junior':
                return await this.editUser('Junior', msg, callbackQuery.id)
            case 'middle':
                return await this.editUser('Middle', msg, callbackQuery.id)
            case 'senior':
                return await this.editUser('Senior', msg, callbackQuery.id)
            case 'startinterview':
                return await this.startinterviewService.startinterview()
            default:
                break
        }
    }

    private async editUser(
        text: 'Junior' | 'Middle' | 'Senior',
        msg: TelegramBot.Message,
        id: string
    ) {
        const bot: TelegramBot = global.bot
        await this.userService.update(msg.chat.id, {
            level: text,
        })
        await bot.answerCallbackQuery(id, {
            show_alert: false,
            text: `Вы выбрали уровень ${text}`,
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
