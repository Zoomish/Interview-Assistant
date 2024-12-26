import { BadRequestException, Injectable } from '@nestjs/common'
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
        const exist = await this.userRepository.findOne({
            where: { email: createUserDto.email },
        })
        if (exist) {
            throw new BadRequestException('User already exists')
        }
        const user = await this.userRepository.save({
            ...createUserDto,
        })
        return user
    }

    async findOne(email: string) {
        return await this.userRepository.findOne({
            where: { email },
        })
    }

    async findAll() {
        return await this.userRepository.find()
    }

    async update(email: string, dto: UpdateUserDto) {
        const user = await this.findOne(email)
        return await this.userRepository.save(Object.assign(user, dto))
    }

    async findOneByTgId(tgId: number) {
        return await this.userRepository.findOne({
            where: { tgId },
        })
    }
}
