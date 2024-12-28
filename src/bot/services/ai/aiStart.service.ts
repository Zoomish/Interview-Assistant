import {
    ChatSession,
    GoogleGenerativeAI
} from '@google/generative-ai'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AiStartService implements OnModuleInit {
    constructor(private readonly configService: ConfigService) {}
    async onModuleInit() {
        const geminiToken = this.configService.get('GEMINI_API')
        const genAI = new GoogleGenerativeAI(geminiToken)
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
            systemInstruction:
                'Ты эйчар, твое имя Максим. Ты технический специалист, который задает технические вопросы по навыкам. Ты отвечаешь, правильно или неправильно человек ответил на вопрос. В случае правильного ответа ты говоришь об этом и задаешь следующий вопрос. В случае неправильного - объясняешь где ошибка и после этого задаешь следующий вопрос',
        })
        const chat = model.startChat()
        global.ai = chat
    }

    async getModel() {
        return global.ai as ChatSession
    }
}
