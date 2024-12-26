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
    MeService,
    WebInitService,
} from './services'

@Injectable()
export class BotService implements OnModuleInit {
    constructor(
        private readonly callbackService: CallbackService,
        private readonly meService: MeService,
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
                command: '/everyday',
                description: 'Отправить сообщение другим пользователям',
            },
            {
                command: '/allgifts',
                description: 'Все подарки',
            },
            {
                command: '/mygifts',
                description: 'Мои подарки',
            },
            {
                command: '/publicgifts',
                description: 'Общие подарки',
            },
            {
                command: '/me',
                description: 'Мои подарки',
            },
            {
                command: '/help',
                description: 'Помощь с командами',
            },
        ])

        bot.on('message', async (msg: TelegramBot.Message) => {
            const chatId = msg.chat.id
            const text = msg.text
            global.msg = msg
            console.log(msg)
            const whiteList: Array<string> = this.configService
                .get('WHITE_LIST')
                .split(',')
                .map((id) => {
                    return Number(id)
                })
            if (!whiteList.find((id) => Number(id) === msg.chat.id)) {
                return this.badUserService.badUser(chatId)
            }
            switch (text) {
                case '/start':
                    return this.greetingService.greeting(chatId, msg)
                case '/help':
                    return this.helpService.help(chatId)
                default:
                    break
            }
            if (msg?.web_app_data?.data) {
                await this.webInitService.init(msg)
            }
            if (!global.user) {
                const user = await this.userService.findOneByTgId(msg.chat.id)
                if (!user) {
                    return this.badUserService.noTg()
                }
                global.user = user
            }
            switch (text) {
                case '/everyday':
                    return this.startMessageService.start(chatId)
                case '/me':
                    return this.meService.getMe(msg)
                default:
                    break
            }
            if (msg.reply_to_message) {
                if (msg.text) {
                    await this.forwardService.forward(msg.reply_to_message)
                } else if (msg.voice) {
                    await this.forwardService.forwardAudio(msg.reply_to_message)
                } else if (msg.video_note) {
                    await this.forwardService.forwardVideoNotes(
                        msg.reply_to_message
                    )
                }
            }
        })
        bot.on('callback_query', async (callbackQuery) => {
            await this.callbackService.callback(callbackQuery)
        })
    }
}
