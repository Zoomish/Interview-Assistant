import { Module } from '@nestjs/common'
import { UserModule } from 'src/user/user.module'
import { BotService } from './bot.service'
import {
    BadCommandService,
    CallbackService,
    GreetingService,
    HelpService,
    StartinterviewService,
    UserInfoService,
} from './services'
import { AiStartService } from './services/ai'
import { MeService } from './services/user/me.service'

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
