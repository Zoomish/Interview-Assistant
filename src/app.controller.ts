import { Controller, Get } from '@nestjs/common'
import { UserService } from './user/user.service'

@Controller('app')
export class AppController {
    constructor(private readonly userService: UserService) {}
    @Get()
    async AAA() {
        return this.userService.findAll()
    }
}
