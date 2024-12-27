import { Module } from '@nestjs/common'
import { UserModule } from 'src/user/user.module'
import { BotService } from './bot.service'
import {
    AiStartService,
    BadCommandService,
    CallbackService,
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
    ],
    exports: [],
})
export class BotModule {}
