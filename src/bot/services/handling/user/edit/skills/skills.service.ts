import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'

@Injectable()
export class SkillsService {
    constructor(private readonly userService: UserService) {}

    async sendSkills() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            skills: [],
        })
        await bot.sendMessage(
            msg.chat.id,
            `Отлично! Теперь укажите свои навыки, через запятую. Например: Node.js, React, Next. Изменение навыков очищает историю`
        )
    }

    async getSkills() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            skills: msg.text.replaceAll(' ', '').split(','),
            localhistory: [],
            startedInterview: false,
        })
        return await bot.sendMessage(
            msg.chat.id,
            `Данные успешно сохранены, а история очищена!`
        )
    }
}
