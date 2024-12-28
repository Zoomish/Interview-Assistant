import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api')
    function aaa() {
        setInterval(
            async () => {
                await fetch('https://interview-assistant.onrender.com/api/app')
            },
            1000 * 60 * 14 + 1000 * 30
        )
    }

    await app.listen(3000, async () => {
        aaa()
        console.log(`Server started on port ${await app.getUrl()}`)
    })
}
bootstrap()
