import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api')
    app.enableCors()
    function aaa() {
        setInterval(
            async () => {
                await fetch('https://gift-backend-gijq.onrender.com/api/user')
            },
            1000 * 60 * 14 + 1000 * 30
        )
    }

    await app.listen(3000, async () => {
        console.log(`Server started on port ${await app.getUrl()}`)
    })
}
bootstrap()
