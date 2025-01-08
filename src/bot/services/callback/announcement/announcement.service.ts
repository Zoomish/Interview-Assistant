import { Injectable } from '@nestjs/common'
import { GlobalAnnouncementService } from '../../handling'

@Injectable()
export class GlobalAnnouncementCallbackService {
    constructor(
        private readonly globalAnnouncementService: GlobalAnnouncementService
    ) {}

    async start(action: string, id: string) {
        switch (action) {
            case 'start':
                return await this.globalAnnouncementService.startAnnouncement()
            case 'end':
                return await this.globalAnnouncementService.endAnnouncement()
            default:
                break
        }
    }
}
