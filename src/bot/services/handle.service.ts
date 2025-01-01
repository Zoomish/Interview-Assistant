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
    LevelService,
    MeService,
    ProfessionService,
    ReviewService,
    SkillsService,
    StartinterviewService,
} from './handling'

@Injectable()
export class HandleService {
    constructor(
        private readonly userService: UserService,
        private readonly startinterviewService: StartinterviewService,
        private readonly helpService: HelpService,
        private readonly reviewService: ReviewService,
        private readonly levelService: LevelService,
        private readonly professionService: ProfessionService,
        private readonly skillsService: SkillsService,
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
        if (
            !user?.professionExist ||
            !user?.skillsExist ||
            !user?.levelExist ||
            user.startedReview
        ) {
            if (
                msg?.entities !== undefined &&
                msg?.entities[0]?.type === 'bot_command'
            ) {
                return await this.badCommandService.noCommands()
            } else {
                return await this.setUserInfo(user)
            }
        }
        return await this.endOptions(text, msg, user)
    }

    async setUserInfo(user: User) {
        if (!user?.professionExist) {
            await this.professionService.getProfession()
            if (!user?.skillsExist) {
                return await this.skillsService.startSkills()
            }
        } else if (!user?.skillsExist) {
            await this.skillsService.getSkills()
            if (!user.level) {
                return await this.levelService.level()
            }
            return
        } else if (!user?.level) {
            return await this.levelService.level()
        } else if (user?.startedReview) {
            return await this.reviewService.getReview()
        }
    }

    async endOptions(text: string, msg: TelegramBot.Message, user: User) {
        switch (text) {
            case '/startinterview':
                if (user.startedInterview) {
                    return await this.badCommandService.alreadyStarted()
                } else {
                    return await this.startinterviewService.startinterview()
                }
            case '/endinterview':
                if (user.startedInterview) {
                    return await this.startinterviewService.endinterview()
                } else {
                    return await this.badCommandService.notStarted()
                }
            case '/me':
                return await this.meService.getMe(msg)
            case '/review':
                return await this.reviewService.startReview()
            default:
                if (
                    msg?.entities !== undefined &&
                    msg?.entities[0]?.type === 'bot_command'
                ) {
                    return await this.badCommandService.badCommand()
                } else if (user.startedInterview) {
                    return await this.generateContentService.generateQuetion(
                        msg.text,
                        user
                    )
                } else {
                    return await this.badCommandService.badText()
                }
        }
    }
}
