import { Module } from '@nestjs/common'
import { UserModule } from 'src/user/user.module'
import { BotService } from './bot.service'
import {
    BadUserService,
    CallbackService,
    GreetingService,
    HelpService,
} from './services'

@Module({
    imports: [UserModule],
    providers: [
        BotService,
        GreetingService,
        CallbackService,
        HelpService,
        BadUserService,
    ],
    exports: [],
})
export class BotModule {}
