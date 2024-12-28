import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import TelegramBot, * as telegram from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'
import {
    BadCommandService,
    CallbackService,
    GenerateContentService,
    GreetingService,
    HelpService,
    MeService,
    StartinterviewService,
    UserInfoService,
} from './services'

@Injectable()
export class BotService implements OnModuleInit {
    constructor(
        private readonly callbackService: CallbackService,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        private readonly startinterviewService: StartinterviewService,
        private readonly userInfoService: UserInfoService,
        private readonly helpService: HelpService,
        private readonly generateContentService: GenerateContentService,
        private readonly meService: MeService,
        private readonly badCommandService: BadCommandService,
        private readonly greetingService: GreetingService
    ) {}

    async onModuleInit() {
        const telegramToken = this.configService.get('TELEGRAM_TOKEN')
        const bot: TelegramBot = new telegram(telegramToken, {
            polling: true,
        })
        await this.initBot(bot)
    }

    async initBot(bot: TelegramBot) {
        global.bot = bot
        await bot.setMyCommands([
            {
                command: '/start',
                description: 'Начать',
            },
            {
                command: '/startinterview',
                description: 'Начать собеседование',
            },
            {
                command: '/me',
                description: 'Редактировать профиль',
            },
            {
                command: '/help',
                description: 'Помощь с командами',
            },
        ])

        bot.on('message', async (msg: TelegramBot.Message) => {
            if (msg.chat.type !== 'private') return
            const bot: TelegramBot = global.bot
            await bot.sendChatAction(msg.chat.id, 'typing')
            const chatId = msg.chat.id
            const text = msg.text
            global.msg = msg
            switch (text) {
                case '/start':
                    return this.greetingService.greeting(msg)
                case '/help':
                    return this.helpService.help(chatId)
                default:
                    break
            }
            if (!global.user) {
                const user = await this.userService.findOne(msg.chat.id)
                global.user = user
            }
            if (!global.user?.profession) {
                global.profession = true
            } else if (!global.user?.skills.length) {
                await this.userInfoService.sendSkills()
                global.skills = true
            } else if (!global.user?.level) {
                global.level = true
            }
            if (global.profession) {
                return await this.userInfoService.getProfession()
            } else if (global.skills) {
                return await this.userInfoService.getSkills()
            } else if (global.level) {
                return await this.userInfoService.level()
            }
            switch (text) {
                case '/startinterview':
                    return this.startinterviewService.startinterview()
                case '/me':
                    return this.meService.getMe(msg)
                default:
                    if (
                        msg?.entities &&
                        msg?.entities[0]?.type === 'bot_command'
                    ) {
                        return await this.badCommandService.badCommand()
                    }
                    return await this.generateContentService.generateQuetion(
                        msg.text
                    )
            }
        })
        bot.on('callback_query', async (callbackQuery) => {
            await this.callbackService.callback(callbackQuery)
        })
    }
}
