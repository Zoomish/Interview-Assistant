import { Module } from '@nestjs/common'
import { UserModule } from 'src/user/user.module'
import { BotService } from './bot.service'
import {
    AiStartService,
    BadCommandService,
    CallbackService,
    EditLevelService,
    EditReviewService,
    EditUserService,
    GenerateContentService,
    GetInfoService,
    GreetingService,
    HandleService,
    HelpService,
    InfoService,
    LevelService,
    MeService,
    ProfessionService,
    ReviewService,
    SkillsService,
    StartinterviewService,
    UserInfoService,
} from './services'

@Module({
    imports: [UserModule],
    providers: [
        BotService,
        StartinterviewService,
        MeService,
        UserInfoService,
        GreetingService,
        CallbackService,
        HelpService,
        BadCommandService,
        AiStartService,
        GenerateContentService,
        EditLevelService,
        EditUserService,
        HandleService,
        InfoService,
        GetInfoService,
        EditReviewService,
        LevelService,
        ProfessionService,
        ReviewService,
        SkillsService,
    ],
    exports: [],
})
export class BotModule {}
