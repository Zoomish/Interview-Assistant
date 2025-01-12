import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { HistoryGlobalService } from 'src/history/history.service'
import { User } from 'src/user/entities/user.entity'
import { AiStartService } from './aiStart.service'

@Injectable()
export class GenerateContentService {
    constructor(
        private readonly aiStartService: AiStartService,
        private readonly historyGlobalService: HistoryGlobalService
    ) {}
    async generateQuetion(text: string, user: User) {
        const chat = await this.aiStartService.getChat()
        const bot: TelegramBot = global.bot
        const chatId = global.msg.chat.id
        await bot.sendChatAction(chatId, 'typing')
        const generatedText = await chat.sendMessage(text)
        const history = await chat.getHistory()
        await this.historyGlobalService.update(chatId, {
            localhistory: [
                ...(user?.history?.localhistory || []),
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
        return await bot.sendMessage(chatId, generatedText.response.text(), {
            parse_mode: 'HTML',
        })
    }
}
