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
        return await bot.sendMessage(chatId, 'Напишите объявление!')
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
        await bot.sendMessage(
            msg.chat.id,
            `<b>Список всех пользователей (${users.length}):</b>`,
            {
                parse_mode: 'HTML',
            }
        )
        users.forEach(async (user) => {
            const messgase =
                user?.localhistory?.length > 0
                    ? Math.floor(user.localhistory.length / 2).toString()
                    : '0'
            await bot.sendChatAction(msg.chat.id, 'typing')
            await bot.sendMessage(
                msg.chat.id,
                '<b>Id:</b> ' +
                    user.tgId.toString() +
                    '\n<b>Ник:</b> ' +
                    '@' +
                    user.nickname +
                    '\n<b>Сообщения:</b> ' +
                    messgase +
                    '\n<b>Имя:</b> ' +
                    user.name +
                    '\n<b>Профессия:</b> ' +
                    user.profession +
                    '\n<b>Уровень:</b> ' +
                    user.level,
                {
                    parse_mode: 'HTML',
                }
            )
        })
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
