import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'
import {
    BadCommandService,
    GenerateContentService,
    GreetingService,
    HelpService,
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
        switch (text) {
            case '/start':
                return await this.greetingService.greeting(msg)
            case '/help':
                return await this.helpService.help(chatId)
            default:
                break
        }
        if (!global.user) {
            return await this.noGlobalUser(msg)
        }
        if (global.profession) {
            await this.userInfoService.getProfession()
            if (global.skills) {
                return await this.userInfoService.sendSkills()
            }
            return
        } else if (global.skills) {
            await this.userInfoService.getSkills()
            if (global.level) {
                return await this.userInfoService.level()
            }
            return
        } else if (global.level) {
            return await this.userInfoService.level()
        }
        switch (text) {
            case '/startinterview':
                return this.startinterviewService.startinterview()
            case '/me':
                return this.meService.getMe(msg)
            default:
                if (msg?.entities && msg?.entities[0]?.type === 'bot_command') {
                    return await this.badCommandService.badCommand()
                }
                return await this.generateContentService.generateQuetion(
                    msg.text
                )
        }
    }

    async noGlobalUser(msg: TelegramBot.Message) {
        const user = await this.userService.findOne(msg.chat.id)
        global.user = user
        if (!user?.profession) {
            global.profession = true
        }
        if (!user?.skills.length) {
            global.skills = true
        }
        if (!user?.level) {
            global.level = true
        }
        if (!user?.profession || !user?.skills.length || !user?.level) {
            await this.badCommandService.badServer('Start')
        }
        if (!user?.profession) {
            return await this.userInfoService.sendProfession()
        } else if (!user?.skills.length) {
            return await this.userInfoService.sendSkills()
        } else if (!user?.level) {
            return await this.userInfoService.level()
        }
    }
}
