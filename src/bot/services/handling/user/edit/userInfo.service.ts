import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'
import { LevelService } from './level'
import { SkillsService } from './skills'

@Injectable()
export class UserInfoService {
    constructor(
        private readonly userService: UserService,
        private readonly skillsService: SkillsService,
        private readonly levelService: LevelService
    ) {}

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
        return await this.skillsService.sendSkills()
    }

    async getSkills() {
        return await this.skillsService.getSkills()
    }

    async level() {
        return await this.levelService.level()
    }

    async startReview() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            startedReview: true,
        })
        await bot.sendMessage(
            msg.chat.id,
            `Отлично! Теперь напишите свой отзыв.`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Отменить',
                                callback_data: 'review_end',
                            },
                        ],
                    ],
                },
            }
        )
    }

    async endReview() {
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            startedReview: false,
        })
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
