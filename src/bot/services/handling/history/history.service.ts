import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { HistoryGlobalService } from 'src/history/history.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class HistoryService {
    constructor(
        private readonly userService: UserService,
        private readonly historyGlobalService: HistoryGlobalService
    ) {}

    async getGlobalHistory() {
        const bot: TelegramBot = global.bot
        const chatId = global.msg.chat.id
        const history = await this.historyGlobalService.findOne(chatId)
        await bot.sendMessage(
            chatId,
            '<b>Ваша история:</b>\n' +
                '<b>Примечание:</b> История обновляется при завершении текущего собеседования',
            {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Очистить историю',
                                callback_data: 'clearHistory',
                            },
                        ],
                    ],
                },
            }
        )
        console.log(history.globalhistory)
    }

    async clearHistory() {
        const chatId = global.msg.chat.id
        await this.userService.update(chatId, {
            startedInterview: false,
        })
        const history = await this.historyGlobalService.findOne(chatId)
        if (history.localhistory.length > 0) {
            await this.historyGlobalService.update(chatId, {
                localhistory: [],
                globalhistory: [...history.globalhistory, history.localhistory],
            })
        }
    }
}
