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
    InfoService,
    InterviewService,
    LevelService,
    MeService,
    ProfessionService,
    ReviewService,
    SkillsService,
    SpeechToTextService,
    StartinterviewService,
} from './services'

@Module({
    imports: [UserModule, ReviewModule, HistoryModule],
    providers: [
        BotService,
        SpeechToTextService,
        GlobalAnnouncementCallbackService,
        StartinterviewService,
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
        InterviewService,
        EditSkillsService,
        EditProfessionService,
    ],
    exports: [],
})
export class BotModule {}
