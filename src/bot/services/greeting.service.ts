import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'

@Injectable()
export class GreetingService {
    constructor(private readonly userService: UserService) {}
    async greeting(msg: TelegramBot.Message) {
        const user = await this.userService.findOne(msg.chat.id)
        if (!user) {
            await this.userService.create({
                tgId: msg.chat.id,
                name: msg?.chat?.first_name,
                nickname: msg?.chat?.username,
            })
        }
        let text = ''
        if (!user.profession) {
            global.profession = true
            text = `Какую профессию вы выбрали?`
        } else if (!user.skills) {
            global.skills = true
            text = `Укажите свои навыки, через запятую. Например: Node.js, React, Next`
        }
        global.user = user
        const bot: TelegramBot = global.bot
        await bot.sendMessage(
            msg.chat.id,
            `Добро пожаловать, ${msg?.chat?.first_name}! Я здесь, чтобы помочь вам уверенно пройти собеседование. ${text}`
        )
    }

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
            `Спасибо! Теперь укажите свои навыки, через запятую. Например: Node.js, React, Next`
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
            `Спасибо! Теперь укажите свой уровень.`,
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
