import { Controller, Get } from '@nestjs/common'

@Controller('app')
export class AppController {
    @Get()
    async AAA() {
        return {}
    }
}
