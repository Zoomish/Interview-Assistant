import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'

@Injectable()
export class SkillsService {
    constructor(private readonly userService: UserService) {}

    async sendSkills() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        const user = await this.userService.findOne(msg.chat.id)
        await this.userService.update(msg.chat.id, {
            skillsExist: false,
        })
        await bot.sendMessage(
            msg.chat.id,
            `Отлично! Теперь укажите свои навыки, через запятую. Например: Node.js, React, Next. Изменение навыков очищает историю`,
            user.skills.length > 0
                ? {
                      reply_markup: {
                          inline_keyboard: [
                              [
                                  {
                                      text: 'Отменить',
                                      callback_data: 'skills_end',
                                  },
                              ],
                          ],
                      },
                  }
                : {}
        )
    }

    async getSkills() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            skills: msg.text.replaceAll(' ', '').split(','),
            skillsExist: true,
            localhistory: [],
            startedInterview: false,
        })
        return await bot.sendMessage(
            msg.chat.id,
            `Данные успешно сохранены, а история очищена!`
        )
    }

    async endSkills() {
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            skillsExist: false,
        })
    }
}
