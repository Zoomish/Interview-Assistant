import { GoogleGenerativeAI } from '@google/generative-ai'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AiStartService {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ) {}

    async getModel() {
        const geminiToken = this.configService.get('GEMINI_API')
        const chatId = global.msg.chat.id
        const genAI = new GoogleGenerativeAI(geminiToken)
        const user = await this.userService.findOne(chatId)
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
        })
        const chat = model.startChat({
            history: user.localhistory,
            systemInstruction: `Ты эйчар, твое имя Максим. Ты технический специалист, который задает технические вопросы по навыкам. Ты отвечаешь, правильно или неправильно человек ответил на вопрос. В случае правильного ответа ты говоришь об этом и задаешь следующий вопрос. В случае неправильного - объясняешь где ошибка и после этого задаешь следующий вопрос. Задавай вопросы уровня ${user.level} профессии ${user.profession} и навыкам ${user.skills.join(', ')}.`,
        })
        global.ai = chat
        return chat
    }
}
