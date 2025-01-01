import { Injectable } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { LevelService } from './level'
import { ProfessionService } from './profession'
import { ReviewService } from './review'
import { SkillsService } from './skills'

@Injectable()
export class UserInfoService {
    constructor(
        private readonly userService: UserService,
        private readonly skillsService: SkillsService,
        private readonly reviewService: ReviewService,
        private readonly professionService: ProfessionService,
        private readonly levelService: LevelService
    ) {}

    async sendProfession() {
        return await this.professionService.sendProfession()
    }

    async getProfession() {
        return await this.professionService.getProfession()
    }

    async sendSkills() {
        return await this.skillsService.sendSkills()
    }

    async getSkills() {
        return await this.skillsService.getSkills()
    }

    async level() {
        return await this.levelService.level()
    }

    async startReview() {
        return await this.reviewService.startReview()
    }

    async endReview() {
        return await this.reviewService.endReview()
    }

    async getReview() {
        return await this.reviewService.getReview()
    }
}
