import { Injectable } from '@nestjs/common'
import { HistoryGlobalService } from 'src/history/history.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class HistoryService {
    constructor(
        private readonly userService: UserService,
        private readonly historyGlobalService: HistoryGlobalService
    ) {}

    async clearHistory() {
        const chatId = global.msg.chat.id
        await this.userService.update(chatId, {
            startedInterview: false,
        })
        const history = await this.historyGlobalService.findOne(chatId)
        if (history.localhistory.length > 0) {
            await this.historyGlobalService.update(chatId, {
                localhistory: [],
                globalhistory: [...history.globalhistory, history.localhistory],
            })
        }
    }
}
