import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'
import { BadCommandService } from './badcommand.service'

@Injectable()
export class GreetingService {
    constructor(
        private readonly userService: UserService,
        private readonly badCommandService: BadCommandService
    ) {}

    async greeting(msg: TelegramBot.Message) {
        let user = await this.userService.findOne(msg.chat.id)
        if (!user) {
            const name =
                msg?.chat?.first_name && msg?.chat?.last_name
                    ? msg?.chat?.first_name + ' ' + msg?.chat?.last_name
                    : msg?.chat?.first_name
            user = await this.userService.create({
                tgId: msg.chat.id,
                name: name,
                nickname: msg?.chat?.username,
            })
        }
        let text = ''
        if (!user?.professionExist) {
            text =
                `Какую профессию вы выбрали?\n\n` +
                '<b>Напоминание:</b> Изменить данные можно с помощью /me, а изменение данных очищает историю.'
        } else if (!user?.skillsExist) {
            text =
                `Теперь укажите свои навыки, через запятую.\n` +
                `<b>Например:</b> Node.js, React, Next.\n\n` +
                '<b>Напоминание:</b> Изменить данные можно с помощью /me, а изменение данных очищает историю.'
        } else if (!user?.level) {
            text =
                `Теперь укажите свой уровень.\n\n` +
                '<b>Напоминание:</b> Изменить данные можно с помощью /me, а изменение данных очищает историю.'
        } else {
            return await this.badCommandService.exist(user)
        }
        const bot: TelegramBot = global.bot
        await bot.sendMessage(
            msg.chat.id,
            `Добро пожаловать, ${msg?.chat?.first_name}! Я здесь, чтобы помочь вам уверенно пройти собеседование. ${text}`,
            user.skillsExist && !user?.level
                ? {
                      parse_mode: 'HTML',
                      reply_markup: {
                          inline_keyboard: [
                              [
                                  {
                                      text: 'Intern (без опыта)',
                                      callback_data: 'level_intern',
                                  },
                              ],
                              [
                                  {
                                      text: 'Junior (1-3 года)',
                                      callback_data: 'level_junior',
                                  },
                              ],
                              [
                                  {
                                      text: 'Middle (3-6 лет)',
                                      callback_data: 'level_middle',
                                  },
                              ],
                              [
                                  {
                                      text: 'Senior (6-10 лет)',
                                      callback_data: 'level_senior',
                                  },
                              ],
                              [
                                  {
                                      text: 'Lead (более 10 лет)',
                                      callback_data: 'level_lead',
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
}
