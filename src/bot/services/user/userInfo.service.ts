import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'

@Injectable()
export class UserInfoService {
    constructor(private readonly userService: UserService) {}
    async profession() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        global.profession = false
        global.skills = true
        await this.userService.update(msg.chat.id, {
            profession: msg.text,
        })
        await bot.sendMessage(
            msg.chat.id,
            `Отлично! Теперь укажите свои навыки, через запятую. Например: Node.js, React, Next`
        )
    }

    async skills() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        global.skills = false
        await this.userService.update(msg.chat.id, {
            skills: msg.text.replaceAll(' ', '').split(','),
        })
        await bot.sendMessage(
            msg.chat.id,
            `Отлично! Теперь укажите свой уровень.`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Junior',
                                callback_data: 'junior',
                            },
                        ],
                        [
                            {
                                text: 'Middle',
                                callback_data: 'middle',
                            },
                        ],
                        [
                            {
                                text: 'Senior',
                                callback_data: 'senior',
                            },
                        ],
                    ],
                },
            }
        )
    }
}
