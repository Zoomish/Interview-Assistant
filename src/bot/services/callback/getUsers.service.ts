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
        const tgIdLenght = 10
        const nicknameLenght = 30
        const nameLenght = 30
        let table = `┌${'─'.repeat(tgIdLenght)}┬${'─'.repeat(nicknameLenght)}┬${'─'.repeat(nameLenght)}┐\n`
        table += `│tgId${' '.repeat(tgIdLenght - 4)}│Nickname${' '.repeat(nicknameLenght - 8)}│Name${' '.repeat(nameLenght - 4)}│\n`
        table += `├${'─'.repeat(tgIdLenght)}┼${'─'.repeat(nicknameLenght)}┼${'─'.repeat(nameLenght)}┤\n`
        users.forEach((row) => {
            table += `│${row.tgId.toString().padEnd(10)}│${row.nickname.slice(0, nicknameLenght).padEnd(nicknameLenght)}│${row.name.slice(0, nameLenght).padEnd(nameLenght)}│\n`
            table += `├${'─'.repeat(tgIdLenght)}┼${'─'.repeat(nicknameLenght)}┼${'─'.repeat(nameLenght)}┤\n`
        })
        table += `└${'─'.repeat(tgIdLenght)}┴${'─'.repeat(nicknameLenght)}┴${'─'.repeat(nameLenght)}┘`
        await bot.sendMessage(chatId, `\`\`\`${table}\`\`\``, {
            parse_mode: 'MarkdownV2',
        })
    }
}
