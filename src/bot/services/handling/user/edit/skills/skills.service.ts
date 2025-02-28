import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'
import { HistoryService } from '../../../history'

@Injectable()
export class SkillsService {
    constructor(
        private readonly userService: UserService,
        private readonly historyService: HistoryService
    ) {}

    async startSkills() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        const user = await this.userService.findOne(msg.chat.id)
        await this.userService.update(msg.chat.id, {
            skillsExist: false,
        })
        await bot.sendMessage(
            msg.chat.id,
            `Отлично! Теперь укажите свои навыки, через запятую.\n` +
                `<b>Например:</b> Node.js, React, Next.\n\n` +
                '<b>Напоминание:</b> Изменить данные можно с помощью /me, а изменение данных очищает историю.',
            user.skills.length > 0
                ? {
                      parse_mode: 'HTML',
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
                : {
                      parse_mode: 'HTML',
                  }
        )
    }

    async getSkills() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            skills: msg.text.split(',').map((str) => {
                return str.trim()
            }),
            skillsExist: true,
        })
        await this.historyService.clearHistory()
        return await bot.sendMessage(msg.chat.id, `Данные успешно сохранены`)
    }

    async endSkills() {
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            skillsExist: true,
        })
    }
}
