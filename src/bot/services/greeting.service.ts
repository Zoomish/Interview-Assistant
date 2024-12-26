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
        global.user = user
        global.profession = true
        const bot: TelegramBot = global.bot
        await bot.sendMessage(
            msg.chat.id,
            `Добро пожаловать, ${msg?.chat?.first_name}! Я здесь, чтобы помочь вам уверенно пройти собеседование. Какую профессию вы выбрали?`
        )
    }

    async profession(){
        const bot: TelegramBot = global.bot
        const chatId = global.msg.chat.id
        await bot.sendMessage(
            chatId,
            `Спасибо! Теперь, какие у вас навыки? Например: React, Next`
        )
    }
}
