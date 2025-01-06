import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { BotModule } from './bot/bot.module'
import { UserModule } from './user/user.module'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs')

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('POSTGRES_HOST'),
                port: configService.get('POSTGRES_PORT'),
                username: configService.get('POSTGRES_USER'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: configService.get('POSTGRES_DATABASE'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
                migrationsRun: true,
                ssl: {
                    rejectUnauthorized: true,
                    ca: fs.readFileSync('./ca.pem').toString(),
                },
                autoLoadEntities: true,
            }),
            inject: [ConfigService],
        }),
        BotModule,
        UserModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
