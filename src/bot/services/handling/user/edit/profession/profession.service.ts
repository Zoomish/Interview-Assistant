import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'

@Injectable()
export class ProfessionService {
    constructor(private readonly userService: UserService) {}

    async startProfession() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        const user = await this.userService.findOne(msg.chat.id)
        await this.userService.update(msg.chat.id, {
            professionExist: false,
        })
        return await bot.sendMessage(
            msg.chat.id,
            `Какую профессию вы выбрали? Изменение профессии очищает историю`,
            user.profession
                ? {
                      reply_markup: {
                          inline_keyboard: [
                              [
                                  {
                                      text: 'Отменить',
                                      callback_data: 'profession_end',
                                  },
                              ],
                          ],
                      },
                  }
                : {}
        )
    }

    async getProfession() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            profession: msg.text,
            professionExist: true,
            localhistory: [],
            startedInterview: false,
        })
        return await bot.sendMessage(
            msg.chat.id,
            `Данные успешно сохранены, а история очищена!`
        )
    }

    async endProfession() {
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            professionExist: false,
        })
    }
}
