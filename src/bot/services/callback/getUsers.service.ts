import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'

@Injectable()
export class GetUsersService {
    constructor(private readonly userService: UserService) {}

    async start(action: string, id: string) {
        switch (action) {
            case 'users':
                return await this.getUsers(id)
            default:
                break
        }
    }
    async getUsers(id: string) {
        const bot: TelegramBot = global.bot
        const chatId = global.msg.chat.id
        await bot.answerCallbackQuery(id, {
            text: `Вы получаете всех пользователей`,
        })
        const users = await this.userService.findAll()
        if (users.length === 0) {
            await bot.sendMessage(chatId, 'Нет ни одного пользователя в базе.')
            return
        }
        await bot.sendMessage(
            chatId,
            `<b>Список всех пользователей (${users.length}):</b>`,
            {
                parse_mode: 'HTML',
            }
        )
        users.forEach(async (user, i) => {
            await bot.sendMessage(
                chatId,
                `<b>Пользователь ${i + 1}:</b>` +
                    '\n<b>Id:</b> ' +
                    user.tgId.toString() +
                    '\n<b>Ник:</b> ' +
                    user.nickname +
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
}
