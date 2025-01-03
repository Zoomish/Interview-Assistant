import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Review } from './entities/review.entity'
import { ReviewService } from './review.service'

@Module({
    imports: [TypeOrmModule.forFeature([Review])],
    providers: [ReviewService],
    exports: [ReviewService],
})
export class ReviewModule {}
