import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'
import { AiStartService } from './ai'

@Injectable()
export class InterviewService {
    constructor(
        private readonly aiStartService: AiStartService,
        private readonly userService: UserService
    ) {}
    async startinterview() {
        const bot: TelegramBot = global.bot
        const chatId = global.msg.chat.id
        const chat = await this.aiStartService.getChat()
        const text = await chat.sendMessage(
            'Расскажи о себе и задай первый вопрос'
        )
        const history = await chat.getHistory()
        await this.userService.update(chatId, {
            startedInterview: true,
            localhistory: history,
        })
        return await bot.sendMessage(chatId, text.response.text())
    }

    async endinterview() {
        const bot: TelegramBot = global.bot
        const chatId = global.msg.chat.id
        await this.userService.update(chatId, {
            startedInterview: false,
            localhistory: [],
        })
        return await bot.sendMessage(
            chatId,
            `Вы остановили собеседование и удалили историю`
        )
    }
}
