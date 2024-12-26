import { Injectable } from '@nestjs/common'
import { WebUserService } from './user'

@Injectable()
export class WebInitService {
    constructor(private readonly webUserService: WebUserService) {}
    async init(msg) {
        const data = JSON.parse(msg.web_app_data.data)
        switch (data.object) {
            case 'user':
                await this.webUserService.init(data)
                break
            case 'gift':
                await this.webUserService.init(data)
                break
            default:
                break
        }
    }
}
