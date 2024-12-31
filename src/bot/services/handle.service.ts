import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { User } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service'
import {
    BadCommandService,
    GenerateContentService,
    GreetingService,
    HelpService,
    InfoService,
    MeService,
    StartinterviewService,
    UserInfoService,
} from './handling'

@Injectable()
export class HandleService {
    constructor(
        private readonly userService: UserService,
        private readonly startinterviewService: StartinterviewService,
        private readonly userInfoService: UserInfoService,
        private readonly helpService: HelpService,
        private readonly infoService: InfoService,
        private readonly generateContentService: GenerateContentService,
        private readonly meService: MeService,
        private readonly badCommandService: BadCommandService,
        private readonly greetingService: GreetingService
    ) {}

    async handleMessage(msg: TelegramBot.Message) {
        if (msg.chat.type !== 'private') return
        const bot: TelegramBot = global.bot
        const chatId = msg.chat.id
        await bot.sendChatAction(chatId, 'typing')
        const text = msg.text
        global.msg = msg
        if (!msg.text) {
            return await this.badCommandService.onlyText()
        }
        switch (text) {
            case '/start':
                return await this.greetingService.greeting(msg)
            case '/help':
                return await this.helpService.help(msg.chat.id)
            case '/info':
                return await this.infoService.info(msg.chat.id)
            default:
                break
        }
        const user = await this.userService.findOne(msg.chat.id)
        if (!user?.profession || !user?.skills.length || !user?.level) {
            if (
                msg?.entities !== undefined &&
                msg?.entities[0]?.type === 'bot_command'
            ) {
                return await this.badCommandService.noCommands()
            } else {
                return await this.setUserInfo(user)
            }
        }
        return await this.endOptions(text, msg)
    }

    async setUserInfo(user: User) {
        if (!user?.profession) {
            await this.userInfoService.getProfession()
            if (!user?.skills.length) {
                return await this.userInfoService.sendSkills()
            }
        } else if (!user?.skills.length) {
            await this.userInfoService.getSkills()
            if (!user?.level) {
                return await this.userInfoService.level()
            }
            return
        } else if (!user?.level) {
            return await this.userInfoService.level()
        }
    }

    async endOptions(text: string, msg: TelegramBot.Message) {
        switch (text) {
            case '/startinterview':
                return this.startinterviewService.startinterview()
            case '/me':
                return this.meService.getMe(msg)
            default:
                if (
                    msg?.entities !== undefined &&
                    msg?.entities[0]?.type === 'bot_command'
                ) {
                    return await this.badCommandService.badCommand()
                }
                return await this.generateContentService.generateQuetion(
                    msg.text
                )
        }
    }
}
