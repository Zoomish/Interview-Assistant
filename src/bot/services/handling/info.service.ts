import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'

@Injectable()
export class InfoService {
    async info(chatId) {
        const bot: TelegramBot = global.bot
        await bot.sendMessage(
            chatId,
            `Этот бот создан мной(@Zoomish) для помощи людям с прохождением собеседований и трудоустройством.\n\nИнформация обо мне:\n`,
            {
                parse_mode: 'HTML',
            }
        )
    }
}
