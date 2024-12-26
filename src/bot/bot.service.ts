import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import TelegramBot, * as telegram from 'node-telegram-bot-api'
import { UserService } from 'src/user/user.service'
import {
    BadUserService,
    CallbackService,
    EveryDayStartMessageService,
    ForwardService,
    GreetingService,
    HelpService,
    WebInitService,
} from './services'

@Injectable()
export class BotService implements OnModuleInit {
    constructor(
        private readonly callbackService: CallbackService,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        private readonly helpService: HelpService,
        private readonly badUserService: BadUserService,
        private readonly forwardService: ForwardService,
        private readonly webInitService: WebInitService,
        private readonly startMessageService: EveryDayStartMessageService,
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
        global.user = undefined
        await bot.setMyCommands([
            {
                command: '/start',
                description: 'Начать',
            },
            {
                command: '/help',
                description: 'Помощь с командами',
            },
        ])

        bot.on('message', async (msg: TelegramBot.Message) => {
            if (msg.chat.type !== 'private') return
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
            if (msg?.web_app_data?.data) {
                await this.webInitService.init(msg)
            }
            if (!global.user) {
                const user = await this.userService.findOne(msg.chat.id)
                if (!user) {
                    return this.badUserService.noTg()
                }
                global.user = user
            }
        })
        bot.on('callback_query', async (callbackQuery) => {
            await this.callbackService.callback(callbackQuery)
        })
    }
}
