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
                `ID: ${user.tgId}\nИмя: ${user.name}\nПрофессия: ${user.profession}\nУровень: ${user.level}`
            )
        })
    }
}
