import { Injectable } from '@nestjs/common'
import { WebUserAuthService } from './auth'

@Injectable()
export class WebUserService {
    constructor(private readonly webUserAuthService: WebUserAuthService) {}
    async init(data) {
        switch (data.type) {
            case 'auth':
                await this.webUserAuthService.Auth(data.data)
                break
            default:
                break
        }
    }
}
