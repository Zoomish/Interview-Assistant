import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'

@Injectable()
export class CallbackService {
    constructor(private readonly userService: UserService) {}
    async callback(callbackQuery) {
        const bot: TelegramBot = global.bot
        const action = callbackQuery.data
        const msg = callbackQuery.message
        switch (action) {
            case 'junior':
                await this.editUser('Junior', msg)
            case 'middle':
                await this.editUser('Middle', msg)
            case 'senior':
                await this.editUser('Senior', msg)
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
                            callback_data: 'start',
                        },
                    ],
                ],
            },
        })
    }
}
