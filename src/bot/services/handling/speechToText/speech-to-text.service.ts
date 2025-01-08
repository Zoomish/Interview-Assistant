import { FileState, GoogleAIFileManager } from '@google/generative-ai/server'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import * as fs from 'fs'
import { v4 as uuid } from 'uuid'
import { AiStartService } from '../ai'

@Injectable()
export class SpeechToTextService {
    constructor(
        private readonly configService: ConfigService,
        private readonly aiStartService: AiStartService
    ) {}
    private readonly logger = new Logger(SpeechToTextService.name)
    private readonly fileManager = new GoogleAIFileManager(
        this.configService.get('GEMINI_API')
    )

    async transcribeOgg(fileUrl: string): Promise<string> {
        if (!this.configService.get('GEMINI_API')) {
            this.logger.error('GEMINI_API не установлен')
            throw new Error('Internal Server Error')
        }
        const oggPath = `temp_${uuid()}.ogg`
        await this.downloadFile(fileUrl, oggPath)
        try {
            const recognizedText = await this.recognizeSpeech(oggPath)
            return recognizedText
        } catch (error) {
            this.logger.error(
                'Error during speech recognition:',
                error.response?.data || error.message
            )
            throw error
        } finally {
            if (fs.existsSync(oggPath)) {
                fs.unlinkSync(oggPath)
            }
        }
    }

    private async recognizeSpeech(filePath: string): Promise<string> {
        const model = await this.aiStartService.getModel()
        const uploadResult = await this.fileManager.uploadFile(
            filePath,
            {
                mimeType: 'audio/ogg',
                displayName: 'Audio sample',
            }
        )

        let file = await this.fileManager.getFile(uploadResult.file.name)
        while (file.state === FileState.PROCESSING) {
            process.stdout.write('.')
            // Sleep for 10 seconds
            await new Promise((resolve) => setTimeout(resolve, 10_000))
            // Fetch the file from the API again
            file = await this.fileManager.getFile(uploadResult.file.name)
        }

        if (file.state === FileState.FAILED) {
            throw new Error('Audio processing failed.')
        }

        // View the response.
        console.log(
            `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`
        )

        try {
            const response = await model.generateContent([
                'Tell me about this audio clip.',
                {
                    fileData: {
                        fileUri: uploadResult.file.uri,
                        mimeType: uploadResult.file.mimeType,
                    },
                },
            ])
            return response.response.text() || 'Не удалось распознать голос.'
        } catch (error) {
            this.logger.error(
                'Error while sending to Yandex STT:',
                error.response?.data || error.message
            )
            throw error
        }
    }

    private async downloadFile(url: string, filePath: string): Promise<void> {
        const response = await axios.get(url, { responseType: 'arraybuffer' })
        fs.writeFileSync(filePath, response.data)
    }
}
