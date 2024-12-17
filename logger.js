import { EventEmitter } from 'events'
import path from 'path'
import fs from 'node:fs/promises'

const dirname = path.dirname(new URL(import.meta.url).pathname)

class Logger extends EventEmitter {
    constructor(fileName = 'app.log') {
        super()
        this.logFilePath = path.join(dirname, fileName)
    }

    async log(message, level = 'INFO') {
        try {
            const timestamp = new Date().toISOString()
            const logMessage = `[${timestamp}] ${level} ${message}\n`

            this.emit('log', {
                timestamp,
                level,
                message
            })

            await fs.appendFile(logMessage, logMessage)
        }
        catch (err) {
            this.emit('error', err)
            throw err
        }
    }

    info(message) {
        return this.log(message, 'INFO')
    }

    error(message) {
        return this.log(message, 'ERROR')
    }
}

export const logger = new Logger('example.log')

logger.on('error', (logData) => {
    console.log(logData)
})

await logger.info('Application started')
await logger.error('Failed to connect to database')
