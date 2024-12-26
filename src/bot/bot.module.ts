import { Module } from '@nestjs/common'
import { UserModule } from 'src/user/user.module'
import { BotService } from './bot.service'
import {
    BadCommandService,
    CallbackService,
    GreetingService,
    HelpService,
    StartinterviewService,
} from './services'

@Module({
    imports: [UserModule],
    providers: [
        BotService,
        StartinterviewService,
        GreetingService,
        CallbackService,
        HelpService,
        BadCommandService,
    ],
    exports: [],
})
export class BotModule {}
