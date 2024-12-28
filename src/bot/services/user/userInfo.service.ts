import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'

@Injectable()
export class UserInfoService {
    constructor(private readonly userService: UserService) {}

    async sendProfession() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        global.profession = true
        return await bot.sendMessage(msg.chat.id, `Какую профессию вы выбрали?`)
    }

    async getProfession() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        global.profession = false
        await this.userService.update(msg.chat.id, {
            profession: msg.text,
        })
        return await bot.sendMessage(msg.chat.id, `Данные успешно сохранены!`)
    }

    async sendSkills() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        global.skills = true
        await bot.sendMessage(
            msg.chat.id,
            `Отлично! Теперь укажите свои навыки, через запятую. Например: Node.js, React, Next`
        )
    }

    async getSkills() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        global.skills = false
        await this.userService.update(msg.chat.id, {
            skills: msg.text.replaceAll(' ', '').split(','),
        })
        return await bot.sendMessage(msg.chat.id, `Данные успешно сохранены!`)
    }

    async level() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        global.level = false
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
