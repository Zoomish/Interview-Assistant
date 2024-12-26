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
                name: msg?.chat?.first_name + ' ' + msg?.chat?.last_name,
                nickname: msg?.chat?.username,
            })
        }
        let text = ''
        if (!user?.profession) {
            global.profession = true
            text = `Какую профессию вы выбрали?`
        }
        if (!user?.skills.length) {
            global.skills = true
            text = `Укажите свои навыки, через запятую. Например: Node.js, React, Next`
        }
        if (!user?.level) {
            global.level = true
        }
        global.user = user
        const bot: TelegramBot = global.bot
        await bot.sendMessage(
            msg.chat.id,
            `Добро пожаловать, ${msg?.chat?.first_name}! Я здесь, чтобы помочь вам уверенно пройти собеседование. ${text}`
        )
    }
}
