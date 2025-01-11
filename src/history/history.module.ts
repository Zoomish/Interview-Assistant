import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/user/entities/user.entity'
import { History } from './entities/history.entity'
import { HistoryGlobalService } from './history.service'

@Module({
    imports: [TypeOrmModule.forFeature([History, User])],
    providers: [HistoryGlobalService],
    exports: [HistoryGlobalService],
})
export class HistoryModule {}
