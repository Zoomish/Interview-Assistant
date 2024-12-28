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
        const data = callbackQuery.data.split('_')
        const bot: TelegramBot = global.bot
        const msg = callbackQuery.message
        global.msg = msg
        const type = data[0]
        const action = data[1]
        switch (type) {
            case 'level':
                return await this.editLevel(action, callbackQuery)
            case 'startinterview':
                await bot.answerCallbackQuery(callbackQuery.id, {
                    text: 'Вы начали собеседование!',
                })
                return await this.startinterviewService.startinterview()
            default:
                break
        }
    }

    async editLevel(action, callbackQuery) {
        switch (action) {
            case 'junior':
                return await this.editUser('Junior', callbackQuery.id)
            case 'middle':
                return await this.editUser('Middle', callbackQuery.id)
            case 'senior':
                return await this.editUser('Senior', callbackQuery.id)
            default:
                break
        }
    }

    private async editUser(text: 'Junior' | 'Middle' | 'Senior', id: string) {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            level: text,
        })
        await bot.answerCallbackQuery(id, {
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
