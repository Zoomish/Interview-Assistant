import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'

@Injectable()
export class MeService {
    constructor(private readonly userService: UserService) {}
    async getMe(msg: TelegramBot.Message) {
        const bot: TelegramBot = global.bot
        const msgWait = await bot.sendMessage(msg.chat.id, `Получаю данные...`)
        const user = await this.userService.findOneByTgId(msg.chat.id)
        await bot.deleteMessage(msgWait.chat.id, msgWait.message_id)
        return await bot.sendMessage(
            msg.chat.id,
            `<b>Меня зовут:</b> ${user.name}\n<b>Мой email:</b> ${user.email}\n<b>Я админ:</b> ${user.admin ? 'Да' : 'Нет'}\n<b>У меня подарков:</b> ${user.gifts.length}\n`,
            {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Мои подарки',
                                callback_data: 'mygifts',
                            },
                            {
                                text: 'Общие подарки',
                                callback_data: 'publicgifts',
                            },
                        ],
                        [
                            {
                                text: 'Все подарки',
                                callback_data: 'allgifts',
                            },
                        ],
                    ],
                },
            }
        )
    }
}
