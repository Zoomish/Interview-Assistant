import { Injectable } from '@nestjs/common'

@Injectable()
export class EditUserService {
    async editUser(action, callbackQuery) {
        switch (action) {
            case 'junior':
                return await this.editUser('Junior', callbackQuery.id)
            case 'middle':
                return await this.editUser('Middle', callbackQuery.id)
            case 'senior':
                return await this.editUser('Senior', callbackQuery.id)
            default:
                break
        }
    }
}
