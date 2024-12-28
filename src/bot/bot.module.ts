import { Module } from '@nestjs/common'
import { UserModule } from 'src/user/user.module'
import { BotService } from './bot.service'
import {
    AiStartService,
    BadCommandService,
    CallbackService,
    EditLevelService,
    EditUserService,
    GenerateContentService,
    GreetingService,
    HelpService,
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
    ],
    exports: [],
})
export class BotModule {}
