import { Module } from '@nestjs/common'
import { UserModule } from 'src/user/user.module'
import { BotService } from './bot.service'
import {
    BadUserService,
    CallbackService,
    EveryDayStartMessageService,
    ForwardService,
    GreetingService,
    HelpService,
    MeService,
    SendMessagesService,
    SuccessAuthService,
    WebInitService,
    WebUserAuthService,
    WebUserService,
} from './services'

@Module({
    imports: [UserModule],
    providers: [
        BotService,
        GreetingService,
        CallbackService,
        MeService,
        HelpService,
        BadUserService,
        WebInitService,
        WebUserService,
        WebUserAuthService,
        SuccessAuthService,
        ForwardService,
        SendMessagesService,
        EveryDayStartMessageService,
    ],
    exports: [],
})
export class BotModule {}
