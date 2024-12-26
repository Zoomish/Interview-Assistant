import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'

@Injectable()
export class MeService {
    constructor(private readonly userService: UserService) {}
    async getMe(msg: TelegramBot.Message) {
        const bot: TelegramBot = global.bot
        const msgWait = await bot.sendMessage(msg.chat.id, `Получаю данные...`)
        const user = await this.userService.findOne(msg.chat.id)
        const photos = await bot.getUserProfilePhotos(user.tgId, {
            offset: 1,
        })
        await bot.deleteMessage(msgWait.chat.id, msgWait.message_id)
        const text = `<b>Меня зовут:</b> ${user.name}\n<b>Профессия:</b> ${
            user.profession
        }\n<b>Уровень:</b> ${user.level}\n<b>Навыки:</b>\n      ${user.skills.join('\n      ')}`
        if (photos.photos.length) {
            return await bot.sendPhoto(
                msg.chat.id,
                photos.photos[0][0].file_id,
                {
                    caption: text,
                    parse_mode: 'HTML',
                }
            )
        }
        return await bot.sendMessage(msg.chat.id, text, {
            parse_mode: 'HTML',
        })
    }
}
