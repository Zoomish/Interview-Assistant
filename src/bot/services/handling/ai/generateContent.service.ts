import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'
import { AiStartService } from './aiStart.service'

@Injectable()
export class GenerateContentService {
    constructor(
        private readonly aiStartService: AiStartService,
        private readonly userService: UserService
    ) {}
    async generateQuetion(text: string) {
        const chat = await this.aiStartService.getModel()
        const bot: TelegramBot = global.bot
        const chatId = global.msg.chat.id
        const msgWait = await bot.sendMessage(chatId, `Генерирую вопрос...`)
        const user = await this.userService.findOne(chatId)
        const generatedText = await chat.sendMessage(text)
        const history = await chat.getHistory()
        await this.userService.update(chatId, {
            localhistory: [
                ...(user.localhistory ? user.localhistory : []),
                ...history,
            ].reduce(
                (res, cur) =>
                    res.find(
                        (find) => JSON.stringify(find) === JSON.stringify(cur)
                    )
                        ? res
                        : [...res, cur],
                []
            ),
        })
        await bot.deleteMessage(msgWait.chat.id, msgWait.message_id)
        return await bot.sendMessage(chatId, generatedText.response.text())
    }
}
