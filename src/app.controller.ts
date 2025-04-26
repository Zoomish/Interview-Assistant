import { Controller, Get } from '@nestjs/common'
import { UserService } from './user/user.service'

@Controller('app')
export class AppController {
    constructor(private readonly userService: UserService) {}
    @Get()
    async AAA() {
        if (new Date().getHours() > 10 && new Date().getHours() < 12) {
            return this.userService.findAll()
        }
        return {}
    }
}
