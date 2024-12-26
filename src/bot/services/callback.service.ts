import { Injectable } from '@nestjs/common'

@Injectable()
export class CallbackService {
    constructor() {}
    async callback(callbackQuery) {
        const action = callbackQuery.data
        const msg = callbackQuery.message
        switch (action) {
            default:
                break
        }
    }
}
