import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as argon2 from 'argon2'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
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
            password: await argon2.hash(createUserDto.password),
        })
        delete user.password
        const token = await this.jwtService.signAsync({
            email: user.email,
            admin: user.admin,
            id: user.id,
        })
        return { user, token }
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
            relations: { gifts: true },
        })
    }
}
