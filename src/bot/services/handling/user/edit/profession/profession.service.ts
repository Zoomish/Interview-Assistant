import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'

@Injectable()
export class ProfessionService {
    constructor(private readonly userService: UserService) {}

    async sendProfession() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            profession: null,
        })
        return await bot.sendMessage(
            msg.chat.id,
            `Какую профессию вы выбрали? Изменение профессии очищает историю`
        )
    }

    async getProfession() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            profession: msg.text,
            localhistory: [],
            startedInterview: false,
        })
        return await bot.sendMessage(msg.chat.id, `Данные успешно сохранены, а история очищена!`)
    }
}
