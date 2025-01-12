import { Module } from '@nestjs/common'
import { HistoryModule } from 'src/history/history.module'
import { ReviewModule } from 'src/review/review.module'
import { UserModule } from 'src/user/user.module'
import { BotService } from './bot.service'
import {
    AiStartService,
    BadCommandService,
    CallbackService,
    EditLevelService,
    EditProfessionService,
    EditReviewService,
    EditSkillsService,
    GenerateContentService,
    GetInfoService,
    GlobalAnnouncementCallbackService,
    GlobalAnnouncementService,
    GreetingService,
    HandleService,
    HelpService,
    HistoryService,
    InfoService,
    InterviewCallbackService,
    InterviewService,
    LevelService,
    MeService,
    ProfessionService,
    ReviewService,
    SkillsService,
    SpeechToTextService,
} from './services'

@Module({
    imports: [UserModule, ReviewModule, HistoryModule],
    providers: [
        BotService,
        SpeechToTextService,
        GlobalAnnouncementCallbackService,
        InterviewService,
        MeService,
        GreetingService,
        CallbackService,
        HelpService,
        BadCommandService,
        AiStartService,
        GenerateContentService,
        GlobalAnnouncementService,
        EditLevelService,
        HandleService,
        InfoService,
        GetInfoService,
        EditReviewService,
        LevelService,
        ProfessionService,
        ReviewService,
        SkillsService,
        InterviewCallbackService,
        EditSkillsService,
        EditProfessionService,
        HistoryService,
    ],
    exports: [],
})
export class BotModule {}
