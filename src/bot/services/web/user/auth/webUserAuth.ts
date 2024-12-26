import { Injectable } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { SuccessAuthService } from './successAuth'

@Injectable()
export class WebUserAuthService {
    constructor(
        private readonly userService: UserService,
        private readonly successAuthService: SuccessAuthService
    ) {}
    async Auth(data) {
        const user = await this.userService.findOne(data.user.email)
        const tgId = user.tgId
        if (!tgId) {
            await this.userService.update(
                data.user.email,
                Object.assign(user, { tgId: global.msg.chat.id })
            )
            await this.successAuthService.setTgId()
        }
        return await this.successAuthService.successAuth()
    }
}
