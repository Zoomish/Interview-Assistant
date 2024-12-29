import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'

@Injectable()
export class GetUsersService {
    constructor(private readonly userService: UserService) {}

    async start(action: string){
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
        let table = '┌───────────┬─────┬─────────────┐\n'
        table += '│ tgId      │ Age │ Occupation  │\n'
        table += '├───────────┼─────┼─────────────┤\n'
        users.forEach((row) => {
            table += `│ ${row.tgId.toString().padEnd(10)} │ ${row.nickname.padEnd(3)} │ ${row.name.padEnd(11)} │\n`
        })
        table += '└───────────┴─────┴─────────────┘'
        await bot.sendMessage(chatId, `\`\`\`${table}\`\`\``, {
            parse_mode: 'MarkdownV2',
        })
    }
}
