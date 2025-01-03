import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { Review } from './entities/review.entity'

@Injectable()
export class ReviewGlobalService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>
    ) {}
    async create(createReviewDto: CreateReviewDto) {
        return await this.reviewRepository.save({
            ...createReviewDto,
        })
    }

    async findOne(id: number) {
        return await this.reviewRepository.findOne({
            where: { id },
            relations: {
                user: true,
            },
        })
    }

    async findAll() {
        return await this.reviewRepository.find({
            relations: {
                user: true,
            },
        })
    }

    async update(id: number, dto: UpdateReviewDto) {
        const review = await this.findOne(id)
        return await this.reviewRepository.save(Object.assign(review, dto))
    }
}
