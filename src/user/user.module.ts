import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Review } from 'src/review/entities/review.entity'
import { User } from './entities/user.entity'
import { UserService } from './user.service'

@Module({
    imports: [TypeOrmModule.forFeature([User, Review])],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
