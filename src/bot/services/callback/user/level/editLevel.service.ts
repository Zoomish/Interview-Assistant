import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'

@Injectable()
export class EditLevelService {
    constructor(private readonly userService: UserService) {}
    async editLevel(action, callbackQuery) {
        switch (action) {
            case 'intern':
                return await this.editUser('Intern', callbackQuery.id)
            case 'junior':
                return await this.editUser('Junior', callbackQuery.id)
            case 'middle':
                return await this.editUser('Middle', callbackQuery.id)
            case 'senior':
                return await this.editUser('Senior', callbackQuery.id)
            case 'lead':
                return await this.editUser('Lead', callbackQuery.id)
            default:
                break
        }
    }

    private async editUser(
        text: 'Intern' | 'Junior' | 'Middle' | 'Senior' | 'Lead',
        id: string
    ) {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            level: text,
            localhistory: [],
            startedInterview: false,
        })
        await bot.answerCallbackQuery(id, {
            text: `Вы изменили уровень на ${text}`,
        })
        await bot.sendMessage(msg.chat.id, `Данные успешно сохранены!`)
        return await bot.sendMessage(
            msg.chat.id,
            `Спасибо! Теперь можно начинать!`,
            {
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
            }
        )
    }
}
