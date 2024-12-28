import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'

@Injectable()
export class EditLevelService {
    constructor(private readonly userService: UserService) {}
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
            text: `Вы изменили уровень на ${text}`,
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
