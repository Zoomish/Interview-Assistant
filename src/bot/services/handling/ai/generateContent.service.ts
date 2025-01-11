import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { User } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service'
import { AiStartService } from './aiStart.service'

@Injectable()
export class GenerateContentService {
    constructor(
        private readonly aiStartService: AiStartService,
        private readonly userService: UserService
    ) {}
    async generateQuetion(text: string, user: User) {
        const chat = await this.aiStartService.getChat()
        const bot: TelegramBot = global.bot
        const chatId = global.msg.chat.id
        await bot.sendChatAction(chatId, 'typing')
        const generatedText = await chat.sendMessage(text)
        const history = await chat.getHistory()
        await this.userService.update(chatId, {
            localhistory: [...user.history.localhistory, ...history].reduce(
                (res, cur) =>
                    res.find(
                        (find) => JSON.stringify(find) === JSON.stringify(cur)
                    )
                        ? res
                        : [...res, cur],
                []
            ),
        })
        return await bot.sendMessage(chatId, generatedText.response.text())
    }
}
