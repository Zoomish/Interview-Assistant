import { Module } from '@nestjs/common'
import { UserModule } from 'src/user/user.module'
import { BotService } from './bot.service'
import {
    AiStartService,
    BadCommandService,
    CallbackService,
    EditLevelService,
    EditUserService,
    ErrorService,
    GenerateContentService,
    GreetingService,
    HandleService,
    HelpService,
    InfoService,
    MeService,
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
        ErrorService,
    ],
    exports: [],
})
export class BotModule {}
