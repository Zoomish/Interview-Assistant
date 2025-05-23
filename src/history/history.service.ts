import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateHistoryDto } from './dto/create-history.dto'
import { UpdateHistoryDto } from './dto/update-history.dto'
import { History } from './entities/history.entity'

@Injectable()
export class HistoryGlobalService {
    constructor(
        @InjectRepository(History)
        private readonly reviewRepository: Repository<History>
    ) {}
    async create(tgid: number, createHistoryDto: CreateHistoryDto) {
        return await this.reviewRepository.save({
            ...createHistoryDto,
            user: { tgId: tgid },
        })
    }

    async findOne(tgid: number) {
        let history = await this.reviewRepository.findOne({
            where: { user: { tgId: tgid } },
            relations: {
                user: true,
            },
        })
        if (!history)
            history = await this.create(tgid, {
                localhistory: [],
                globalhistory: [],
            })
        return history
    }

    async findAll() {
        return await this.reviewRepository.find({
            relations: {
                user: true,
            },
        })
    }

    async update(tgid: number, dto: UpdateHistoryDto) {
        let review = await this.findOne(tgid)
        return await this.reviewRepository.save(Object.assign(review, dto))
    }
}
