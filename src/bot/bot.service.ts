import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import TelegramBot, * as telegram from 'node-telegram-bot-api'
import { CallbackService, ErrorService, HandleService } from './services'

@Injectable()
export class BotService implements OnModuleInit {
    constructor(
        private readonly callbackService: CallbackService,
        private readonly handleService: HandleService,
        private readonly errorService: ErrorService,
        private readonly configService: ConfigService
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
            {
                command: '/info',
                description: 'Информация о боте',
            },
        ])

        bot.on('message', async (msg: TelegramBot.Message) => {
            try {
                return await this.handleService.handleMessage(msg)
            } catch (error) {
                return await this.errorService.error(error)
            }
        })
        bot.on('callback_query', async (callbackQuery) => {
            await this.callbackService.callback(callbackQuery)
        })
    }
}
