import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-review.dto'
import { UpdateUserDto } from './dto/update-review.dto'
import { Review } from './entities/review.entity'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>
    ) {}
    async create(createUserDto: CreateUserDto) {
        const user = await this.reviewRepository.save({
            ...createUserDto,
        })
        return user
    }

    async findOne(id: number) {
        return await this.reviewRepository.findOne({
            where: { id },
        })
    }

    async findAll() {
        return await this.reviewRepository.find()
    }

    async update(id: number, dto: UpdateUserDto) {
        const user = await this.findOne(id)
        return await this.reviewRepository.save(Object.assign(user, dto))
    }
}
