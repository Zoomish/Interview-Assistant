# Telegram Bot for Interview Preparation

This repository contains a Telegram bot built using [Nest.js](https://nestjs.com/) and the [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api). The bot leverages AI to help users improve their theoretical knowledge and prepare for job interviews by asking profession-specific and skill-based questions.

## Features

- **Interview Preparation**: Simulates interview scenarios by asking relevant questions based on the user's profession and skills.
- **Skill Development**: Assists users in improving their theoretical knowledge with targeted questions.
- **AI Integration**: Generates dynamic and adaptive questions using artificial intelligence.
- **User-Friendly**: Accessible and interactive interface through Telegram.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm
- A Telegram Bot Token (create one via [BotFather](https://core.telegram.org/bots#botfather))

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Zoomish/Interview-Assistant.git
   cd Interview-Assistant
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```env
     GEMINI_API = your-gemini-api-key
     TELEGRAM_TOKEN = your-telegram-bot-token
     POSTGRES_USER = your-bd-user
     POSTGRES_HOST = your-host-user
     POSTGRES_PASSWORD = your-password-user
     POSTGRES_DATABASE = your-database-user
     POSTGRES_PORT = your-database-port
   ```

#### 1. Create a Service Account in Yandex Cloud

1. **Create a service account:**
    ```powershell
    yc iam service-account create --name=speek --description="Service account for SpeechKit"
    ```

2. **Retrieve the ID of the created service account:**
    ```powershell
    yc iam service-account list
    ```
    Find the `ID` of your `speek` service account.

#### 2. Assign Roles to the Service Account

Run the following **single-line** command in **PowerShell**:

```powershell
yc resource-manager folder add-access-binding your-folder-id --role editor --subject serviceAccount:your-service-id
```

Where:
- `your-folder-id` is your folder ID.
- `your-service-id` is the service account ID of your `speek` account.

#### 3. Obtain an API Token

Run the following command in PowerShell to generate an API token while impersonating the service account:

```powershell
 yc iam api-key create --service-account-name speek --description "API key for SpeechKit"
```

**Result:** The command will return an API token in the "secret" field. Copy this token.

#### 4. Configure Environment Variables

Update the `.env` file at the project root with the following variables:

```env
YANDEX_API_TOKEN = your-api-token
YANDEX_FOLDER_ID = your-folder-id
```

#### 5. Activate SpeechKit in Yandex Cloud Console

1. Open the Yandex Cloud Console.
2. Select your Cloud and Folder.
3. In the left sidebar, find and select SpeechKit.
4. Activate the SpeechKit service following the on-screen instructions.

### Running the Bot

#### Development Mode
```bash
npm run start:dev
```

#### Production Mode
```bash
npm run build
npm run start
```

### Deployment
The bot can be deployed on any Node.js-compatible platform. For cloud deployment, consider services like Heroku, AWS, or Google Cloud.

## Project Structure

- **src**: Contains the source code
  - **app**: Main application module
  - **bot**: Telegram bot logic and handlers
  - **services**: Business logic and AI integration
  - **config**: Configuration and environment setup

## Usage
1. Start the bot on Telegram using the `/start` command.
2. Choose your profession and skills.
3. Answer questions to practice your knowledge and prepare for interviews.
4. Get instant feedback and explanations for your answers.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [Nest.js](https://nestjs.com/)
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
- [Gemini API](https://ai.google.dev/gemini-api/docs)

