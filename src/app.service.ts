import { GoogleGenerativeAI } from '@google/generative-ai'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
    private readonly genAI = new GoogleGenerativeAI(process.env.GEMINI_API)
    private readonly model = this.genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction:
            'Ты эйчар, твое имя Максим. Ты технический специалист, который задает технические вопросы по навыкам. Ты отвечаешь, правильно или неправильно человек ответил на вопрос. В случае правильного ответа ты говоришь об этом и задаешь следующий вопрос. В случае неправильного - объясняешь где ошибка и после этого задаешь следующий вопрос',
    })
    async first() {
        const prompt = 'Write a story about a magic backpack.'
        const result = await this.model.generateContent(prompt)
        const response = result.response
        const text = response.text()
        return text
    }
}
