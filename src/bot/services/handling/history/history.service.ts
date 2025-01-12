import { Injectable } from '@nestjs/common'
import TelegramBot, { InlineKeyboardButton } from 'node-telegram-bot-api'
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
            '<b>Примечание:</b> История обновляется при завершении текущего собеседования\n' +
                '<b>Ваша история:</b>',
            {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: history.globalhistory.map((el, i) => [
                        {
                            text: `Запись: ${el[2].parts[0].text}`,
                            callback_data: `history_get-${i}`,
                        } as InlineKeyboardButton,
                    ]),
                },
            }
        )
    }

    async getArcticle(id: number) {
        const bot: TelegramBot = global.bot
        const chatId = global.msg.chat.id
        const Allhistory = await this.historyGlobalService.findOne(chatId)
        const history = Allhistory.globalhistory[id]
        return history.map(async (el) => {
            await bot.sendMessage(
                chatId,
                `<b>Кто говорит: ${el.role === 'model' ? 'Бот' : 'Вы'}:</b>\n` +
                    `<b>Сообщение:</b> \n` +
                    el.parts[0].text,
                {
                    parse_mode: 'HTML',
                }
            )
        })
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
