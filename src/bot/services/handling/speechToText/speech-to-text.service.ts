import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import * as fs from 'fs'
import { v4 as uuid } from 'uuid'

@Injectable()
export class SpeechToTextService {
    constructor(private readonly configService: ConfigService) {}
    private readonly logger = new Logger(SpeechToTextService.name)
    private readonly apiToken = this.configService.get('YANDEX_API_TOKEN')
    private readonly folderId = this.configService.get('YANDEX_FOLDER_ID')

    async transcribeOgg(fileUrl: string): Promise<string> {
        if (!this.apiToken || !this.folderId) {
            this.logger.error(
                'YANDEX_API_TOKEN или YANDEX_FOLDER_ID не установлены'
            )
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
        const recognizeUrl = `https://stt.api.cloud.yandex.net/speech/v1/stt:recognize?folderId=${this.folderId}&lang=ru-RU`

        const audioBuffer = fs.readFileSync(filePath)

        try {
            const response = await axios.post(recognizeUrl, audioBuffer, {
                headers: {
                    Authorization: `Api-key ${this.apiToken}`,
                    'Content-Type': 'application/octet-stream',
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
            })

            return response.data.result || 'Не удалось распознать голос.'
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
