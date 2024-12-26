import { Injectable } from '@nestjs/common'
import { GiftsService } from './gifts.service'
import { MeService } from './me.service'

@Injectable()
export class CallbackService {
    constructor(
        private readonly giftsService: GiftsService,
        private readonly meService: MeService
    ) {}
    async callback(callbackQuery) {
        const action = callbackQuery.data
        const msg = callbackQuery.message
        switch (action) {
            case 'allgifts':
                return await this.giftsService.getAllGifts(msg.chat.id)
            case 'mygifts':
                return await this.giftsService.getMyGifts(msg.chat.id)
            case 'publicgifts':
                return await this.giftsService.getPublicGifts(msg.chat.id)
            case 'me':
                return await this.meService.getMe(msg)
            default:
                break
        }
    }
}
