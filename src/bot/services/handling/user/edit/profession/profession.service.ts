import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'

@Injectable()
export class UserInfoService {
    constructor(private readonly userService: UserService) {}

    async sendProfession() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            profession: null,
        })
        return await bot.sendMessage(msg.chat.id, `Какую профессию вы выбрали?`)
    }

    async getProfession() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            profession: msg.text,
        })
        return await bot.sendMessage(msg.chat.id, `Данные успешно сохранены!`)
    }
}
