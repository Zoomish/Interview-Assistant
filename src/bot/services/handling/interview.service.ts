import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { HistoryGlobalService } from 'src/history/history.service'
import { UserService } from 'src/user/user.service'
import { AiStartService } from './ai'

@Injectable()
export class InterviewService {
    constructor(
        private readonly aiStartService: AiStartService,
        private readonly historyGlobalService: HistoryGlobalService,
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
        })
        await this.historyGlobalService.update(chatId, {
            localhistory: history,
        })
        return await bot.sendMessage(chatId, text.response.text(), {
            parse_mode: 'HTML',
        })
    }

    async endinterview() {
        const bot: TelegramBot = global.bot
        const chatId = global.msg.chat.id
        await this.userService.update(chatId, {
            startedInterview: false,
        })
        const history = await this.historyGlobalService.findOne(chatId)
        await this.historyGlobalService.update(chatId, {
            localhistory: [],
            globalhistory: [...history.globalhistory, history.localhistory],
        })
        return await bot.sendMessage(
            chatId,
            `Вы остановили собеседование и очистили историю`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Начать собеседование',
                                callback_data: 'interview_start',
                            },
                        ],
                    ],
                },
            }
        )
    }
}
