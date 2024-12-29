import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'

@Injectable()
export class GetUsersService {
    constructor(private readonly userService: UserService) {}

    async start(action: string) {
        switch (action) {
            case 'users':
                return await this.getUsers()
            default:
                break
        }
    }
    async getUsers() {
        const bot: TelegramBot = global.bot
        const chatId = global.msg.chat.id
        const users = await this.userService.findAll()
        users.forEach(async (user) => {
            await bot.sendMessage(
                chatId,
                '<b>Id:</b> ' +
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
