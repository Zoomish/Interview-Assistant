import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'

@Injectable()
export class GreetingService {
    constructor(private readonly userService: UserService) {}
    async greeting(msg: TelegramBot.Message) {
        console.log(msg)

        // const user = await this.userService.findOne(msg.chat.id)
        // if (!user) {
        //     await this.userService.create({ tgId: msg.chat.id })
        // }
        const bot: TelegramBot = global.bot
        await bot.sendMessage(
            msg.chat.id,
            `Добро пожаловать, ${msg?.chat?.first_name}! Я здесь, чтобы помочь вам уверенно пройти собеседование. Какую профессию вы выбрали?`
        )
    }
}
