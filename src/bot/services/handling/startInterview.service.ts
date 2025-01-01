import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'
import { AiStartService } from './ai'

@Injectable()
export class StartinterviewService {
    constructor(
        private readonly aiStartService: AiStartService,
        private readonly userService: UserService
    ) {}
    async startinterview() {
        const bot: TelegramBot = global.bot
        const chatId = global.msg.chat.id
        await this.userService.update(chatId, {
            startedInterview: true,
        })
        const chat = await this.aiStartService.getModel()
        const text = await chat.sendMessage(
            'Расскажи о себе и задай первый вопрос'
        )
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
