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
            `Привет, ${msg?.chat?.first_name}! Этого бота я делал как дополнение к подарку, так что надеюсь он тебе понравится)`
        )
    }
}
