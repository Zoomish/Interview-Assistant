import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'
import { InterviewService } from '../../../interview.service'

@Injectable()
export class ProfessionService {
    constructor(
        private readonly userService: UserService,
        private readonly interviewService: InterviewService
    ) {}

    async startProfession() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        const user = await this.userService.findOne(msg.chat.id)
        await this.userService.update(msg.chat.id, {
            professionExist: false,
        })
        return await bot.sendMessage(
            msg.chat.id,
            `Какую профессию вы выбрали? Изменение профессии очищает историю\n\n` +
                '<b>Напоминание:</b> Изменить данные можно с помощью /me, а изменение данных очищает историю.',
            user.profession
                ? {
                      parse_mode: 'HTML',
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
                : {
                      parse_mode: 'HTML',
                  }
        )
    }

    async getProfession() {
        const bot: TelegramBot = global.bot
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            profession: msg.text,
            professionExist: true,
        })
        await this.interviewService.endinterview()
        return await bot.sendMessage(msg.chat.id, `Данные успешно сохранены!`)
    }

    async endProfession() {
        const msg: TelegramBot.Message = global.msg
        await this.userService.update(msg.chat.id, {
            professionExist: true,
        })
    }
}
