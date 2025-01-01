import { Injectable } from '@nestjs/common'
import { LevelService } from './level'
import { ProfessionService } from './profession'
import { ReviewService } from './review'
import { SkillsService } from './skills'

@Injectable()
export class UserInfoService {
    constructor(
        private readonly skillsService: SkillsService,
        private readonly reviewService: ReviewService,
        private readonly professionService: ProfessionService,
        private readonly levelService: LevelService
    ) {}

    async startProfession() {
        return await this.professionService.sendProfession()
    }

    async getProfession() {
        return await this.professionService.getProfession()
    }

    async endProfession() {
        return await this.professionService.endProfession()
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
