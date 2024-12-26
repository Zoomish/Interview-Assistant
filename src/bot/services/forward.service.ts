import { Injectable } from '@nestjs/common'
import { SendMessagesService } from './everyday'

@Injectable()
export class ForwardService {
    constructor(private readonly sendMessagesService: SendMessagesService) {}
    async forward(forward) {
        switch (forward.text) {
            case 'Отправь сообщения/гоолсовое сообщение/видеосообщение для других пользователей ответом на это сообщение':
                await this.sendMessagesService.sendMessages()
                break
            default:
                break
        }
    }

    async forwardAudio(forward) {
        switch (forward.text) {
            case 'Отправь сообщения/гоолсовое сообщение/видеосообщение для других пользователей ответом на это сообщение':
                await this.sendMessagesService.sendAudios()
                break
            default:
                break
        }
    }

    async forwardVideoNotes(forward) {
        switch (forward.text) {
            case 'Отправь сообщения/гоолсовое сообщение/видеосообщение для других пользователей ответом на это сообщение':
                await this.sendMessagesService.sendVideoNotes()
                break
            default:
                break
        }
    }
}
