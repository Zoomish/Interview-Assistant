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

    async sendSkills() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            skills: [],
        })
        await bot.sendMessage(
            msg.chat.id,
            `Отлично! Теперь укажите свои навыки, через запятую. Например: Node.js, React, Next`
        )
    }

    async getSkills() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            skills: msg.text.replaceAll(' ', '').split(','),
        })
        return await bot.sendMessage(msg.chat.id, `Данные успешно сохранены!`)
    }

    async level() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await bot.sendMessage(
            msg.chat.id,
            `Отлично! Теперь укажите свой уровень.`,
            {
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
        )
    }

    async sendReview() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            startedReview: true,
        })
        await bot.sendMessage(
            msg.chat.id,
            `Отлично! Теперь напишите свой отзыв.`
        )
    }

    async getReview() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            review: msg.text,
            startedReview: false,
        })
        return await bot.sendMessage(msg.chat.id, `Данные успешно сохранены!`)
    }
}
