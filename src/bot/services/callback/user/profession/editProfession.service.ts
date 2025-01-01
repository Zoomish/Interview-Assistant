import { Injectable } from '@nestjs/common'
import { UserInfoService } from 'src/bot/services/handling'

@Injectable()
export class EditProfessionService {
    constructor(private readonly userInfoService: UserInfoService) {}
    async start(action, callbackQuery) {
        switch (action) {
            case 'start':
                return await this.userInfoService.sendProfession()
            case 'end':
                return await this.editUser('Junior', callbackQuery.id)
        }
    }
}
