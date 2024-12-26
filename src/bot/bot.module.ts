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
    ],
    exports: [],
})
export class BotModule {}
