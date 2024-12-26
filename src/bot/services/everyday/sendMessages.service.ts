import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'

@Injectable()
export class SendMessagesService {
    constructor(private readonly userService: UserService) {}
    async sendMessages() {
        const bot: TelegramBot = global.bot
        const msg = global.msg
        const users = (await this.userService.findAll()).filter(
            (user) => user.tgId !== msg.chat.id && user.tgId
        )
        users.forEach((user) => {
            bot.sendMessage(user.tgId, msg.text)
        })
        await bot.sendMessage(msg.chat.id, `Сообщения отправлены!`)
    }

    async sendAudios() {
        const bot: TelegramBot = global.bot
        const msg = global.msg
        const users = (await this.userService.findAll()).filter(
            (user) => user.tgId !== msg.chat.id && user.tgId
        )
        users.forEach((user) => {
            bot.sendVoice(user.tgId, msg.voice.file_id)
        })
        await bot.sendMessage(msg.chat.id, `Сообщения отправлены!`)
    }

    async sendVideoNotes() {
        const bot: TelegramBot = global.bot
        const msg = global.msg
        const users = (await this.userService.findAll()).filter(
            (user) => user.tgId !== msg.chat.id && user.tgId
        )
        users.forEach((user) => {
            bot.sendVideoNote(user.tgId, msg.video_note.file_id)
        })
        await bot.sendMessage(msg.chat.id, `Сообщения отправлены!`)
    }
}
