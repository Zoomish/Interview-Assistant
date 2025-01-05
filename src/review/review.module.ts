import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/user/entities/user.entity'
import { Review } from './entities/review.entity'
import { ReviewGlobalService } from './review.service'

@Module({
    imports: [TypeOrmModule.forFeature([Review, User])],
    providers: [ReviewGlobalService],
    exports: [ReviewGlobalService],
})
export class ReviewModule {}
