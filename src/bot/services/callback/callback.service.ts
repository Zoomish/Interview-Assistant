import { Injectable } from '@nestjs/common'
import TelegramBot from 'node-telegram-bot-api'
import { BadCommandService, LevelService } from '../handling'
import { GlobalAnnouncementCallbackService } from './announcement'
import { GetInfoService } from './getInfo.service'
import { HistoryCallbackService } from './history'
import { InterviewCallbackService } from './interview'
import { EditReviewService } from './review'
import {
    EditLevelService,
    EditProfessionService,
    EditSkillsService,
} from './user'

@Injectable()
export class CallbackService {
    constructor(
        private readonly editLevelService: EditLevelService,
        private readonly getInfoService: GetInfoService,
        private readonly editSkillsService: EditSkillsService,
        private readonly levelService: LevelService,
        private readonly globalAnnouncementCallbackService: GlobalAnnouncementCallbackService,
        private readonly editProfessionService: EditProfessionService,
        private readonly editReviewService: EditReviewService,
        private readonly badCommandService: BadCommandService,
        private readonly historyCallbackService: HistoryCallbackService,
        private readonly interviewCallbackService: InterviewCallbackService
    ) {}
    async callback(callbackQuery: TelegramBot.CallbackQuery) {
        const data = callbackQuery.data.split('_')
        const bot: TelegramBot = global.bot
        const msg = callbackQuery.message
        global.msg = msg
        const type = data[0]
        const action = data[1]
        switch (type) {
            case 'getlevel':
                return await this.editLevelService.editLevel(
                    action,
                    callbackQuery
                )
            case 'profession':
                return await this.editProfessionService.start(
                    action,
                    callbackQuery.id
                )
            case 'skills':
                return await this.editSkillsService.start(
                    action,
                    callbackQuery.id
                )
            case 'announcement':
                return await this.globalAnnouncementCallbackService.start(
                    action,
                    callbackQuery.id
                )
            case 'history':
                return await this.historyCallbackService.getHistory(
                    action,
                    callbackQuery.id
                )
            case 'level':
                await bot.answerCallbackQuery(callbackQuery.id, {
                    text: 'Вы выбрали изменить уровень',
                })
                return await this.levelService.level()
            case 'get':
                return await this.getInfoService.start(action, callbackQuery.id)
            case 'review':
                return await this.editReviewService.editReview(
                    action,
                    callbackQuery.id
                )
            case 'interview':
                return await this.interviewCallbackService.start(
                    action,
                    callbackQuery.id
                )
            default:
                return await this.badCommandService.badQuery()
        }
    }
}
