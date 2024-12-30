import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'

@Injectable()
export class InfoService {
    async info(chatId) {
        const bot: TelegramBot = global.bot
        await bot.sendMessage(
            chatId,
            'Этот бот создан мной(@Zoomish) для помощи людям с прохождением собеседований и трудоустройством.\n\n' +
                '<b>Информация обо мне:</b>\n' +
                "<b>Меня зовут:</b> <a href='https://t.me/Zoomish'>Резвый Егор</a>\n" +
                "<b>Мой гитхаб:</b> <a href='https://github.com/Zoomish'>Zoomish</a>\n" +
                "<b>Мой канал:</b> <a href='https://t.me/ZoomishChannel'>Zoomish Channel</a>\n",
            {
                parse_mode: 'HTML',
            }
        )
    }
}
