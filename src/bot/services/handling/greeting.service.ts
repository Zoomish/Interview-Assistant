import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'

@Injectable()
export class GreetingService {
    constructor(private readonly userService: UserService) {}
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
        if (!user?.profession) {
            global.profession = true
            text = `Какую профессию вы выбрали?`
        }
        if (!user?.skills.length) {
            global.skills = true
            if (user?.profession) {
                text = `Укажите свои навыки, через запятую. Например: Node.js, React, Next`
            }
        }
        if (!user?.level) {
            global.level = true
            if (user?.skills.length) {
                text = `Теперь укажите свой уровень.`
            }
        }
        global.user = user
        const bot: TelegramBot = global.bot
        await bot.sendMessage(
            msg.chat.id,
            `Добро пожаловать, ${msg?.chat?.first_name}! Я здесь, чтобы помочь вам уверенно пройти собеседование. ${text}`,
            user?.skills.length
                ? user.level
                    ? {
                          reply_markup: {
                              inline_keyboard: [
                                  [
                                      {
                                          text: 'Начать собеседование',
                                          callback_data: 'startinterview',
                                      },
                                  ],
                              ],
                          },
                      }
                    : {
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
                : {}
        )
    }
}
