import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Betting } from 'src/betting/entities/betting.entity'
import { Gift } from 'src/gift/entities/gift.entity'
import { UploadModule } from 'src/upload/upload.module'
import { User } from './entities/user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Gift, Betting]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: '30d' },
            }),
            inject: [ConfigService],
        }),
        UploadModule,
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
