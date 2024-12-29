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
        const idLenght = 10
        const nicknameLenght = Math.max(...users.map((o) => o.nickname.length))
        const nameLenght = Math.max(...users.map((o) => o.name.length))
        let table =
            '┌' +
            '─'.repeat(idLenght) +
            '┬' +
            '─'.repeat(nicknameLenght) +
            '┬' +
            '─'.repeat(nameLenght) +
            '┐\n'
        table += '│    tgId    │ Age │ Occupation  │\n'
        table +=
            '┌' +
            '─'.repeat(idLenght) +
            '┬' +
            '─'.repeat(nicknameLenght) +
            '┬' +
            '─'.repeat(nameLenght) +
            '┐\n'
        users.forEach((row) => {
            table += `│${row.tgId.toString().padEnd(10)}│${row.nickname.padEnd(nicknameLenght, ' ')}│${row.name.padEnd(nameLenght, ' ')}│\n`
        })
        table +=
            '└' +
            '─'.repeat(idLenght) +
            '┴' +
            '─'.repeat(nicknameLenght) +
            '┴' +
            '─'.repeat(nameLenght) +
            '┘'
        await bot.sendMessage(chatId, `\`\`\`${table}\`\`\``, {
            parse_mode: 'MarkdownV2',
        })
    }
}
