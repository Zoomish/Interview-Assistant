import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}
    async create(createUserDto: CreateUserDto) {
        const user = await this.userRepository.save({
            ...createUserDto,
        })
        return user
    }

    async findOne(tgId: number) {
        return await this.userRepository.findOne({
            where: { tgId },
        })
    }

    async findAll() {
        return await this.userRepository.find()
    }

    async update(tgId: number, dto: UpdateUserDto) {
        const user = await this.findOne(tgId)
        return await this.userRepository.save(Object.assign(user, dto))
    }
}
