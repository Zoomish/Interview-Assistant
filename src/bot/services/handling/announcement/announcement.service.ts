import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'

@Injectable()
export class GlobalAnnouncementService {
    constructor(private readonly userService: UserService) {}

    async startAnnouncement() {
        const bot: TelegramBot = global.bot
        const chatId = global.msg.chat.id
        await this.userService.update(chatId, {
            startedAnnouncement: true,
        })
        return await bot.sendMessage(chatId, '<b>Напишите объявление</b>', {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Отменить',
                            callback_data: 'announcement_end',
                        },
                    ],
                ],
            },
        })
    }

    async getAnnouncement() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        const users = await this.userService.findAll()
        if (users.length === 1) {
            await bot.sendMessage(
                msg.chat.id,
                'Нет ни одного пользователя в базе.'
            )
            return
        }
        users.forEach(async (user) => {
            if (user.tgId === msg.chat.id) {
                await bot.sendChatAction(msg.chat.id, 'typing')
                await bot.sendMessage(user.tgId, msg.text, {
                    parse_mode: 'HTML',
                })
            }
        })
        await bot.sendMessage(
            msg.chat.id,
            `<b>Объявление отправлено ${users.length - 1} пользователям</b>`,
            {
                parse_mode: 'HTML',
            }
        )
    }

    async endAnnouncement() {
        const bot: TelegramBot = global.bot
        const chatId = global.msg.chat.id
        await this.userService.update(chatId, {
            startedAnnouncement: false,
        })
        return await bot.sendMessage(chatId, 'Вы отменили объявление!')
    }
}
