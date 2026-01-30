import Queue from 'bull'
import Redis from 'ioredis'
import { WhatsAppClientManager } from './client-manager'

interface MessageJob {
    sessionId: string
    phoneNumber: string
    message: string
    messageId: string
}

export class MessageQueue {
    private queue: Queue.Queue<MessageJob>
    private clientManager: WhatsAppClientManager

    constructor(clientManager: WhatsAppClientManager) {
        this.clientManager = clientManager

        const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

        // Parse Redis URL for TLS support (Upstash uses rediss://)
        const redisTLS = redisUrl.startsWith('rediss://')

        this.queue = new Queue<MessageJob>('whatsapp-messages', redisUrl, {
            redis: {
                tls: redisTLS ? {} : undefined,
                maxRetriesPerRequest: null,
                enableReadyCheck: false,
            },
            defaultJobOptions: {
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 2000,
                },
                removeOnComplete: true,
                removeOnFail: false,
            },
        })

        this.setupProcessor()
        this.setupEventListeners()
    }

    private setupProcessor() {
        // Process messages with rate limiting
        this.queue.process(5, async (job) => {
            const { sessionId, phoneNumber, message, messageId } = job.data

            try {
                // Add delay between messages (anti-ban measure)
                // Random delay between 3-7 seconds
                const delay = Math.floor(Math.random() * 4000) + 3000
                await this.sleep(delay)

                // Send message
                await this.clientManager.sendMessage(sessionId, phoneNumber, message)

                // Notify app of success
                await this.notifyApp(messageId, 'SENT', null)

                return { success: true, messageId }
            } catch (error: any) {
                console.error(`Error sending message ${messageId}:`, error)

                // Notify app of failure
                await this.notifyApp(messageId, 'FAILED', error.message)

                throw error
            }
        })
    }

    private setupEventListeners() {
        this.queue.on('completed', (job, result) => {
            console.log(`Message ${result.messageId} sent successfully`)
        })

        this.queue.on('failed', (job, err) => {
            console.error(`Message ${job.data.messageId} failed:`, err.message)
        })

        this.queue.on('stalled', (job) => {
            console.warn(`Message ${job.data.messageId} stalled`)
        })
    }

    async addMessage(data: MessageJob): Promise<void> {
        await this.queue.add(data, {
            priority: 1,
        })
    }

    async addBulkMessages(messages: MessageJob[]): Promise<void> {
        const jobs = messages.map((data) => ({
            data,
            opts: { priority: 1 },
        }))

        await this.queue.addBulk(jobs)
    }

    async getStats() {
        const [waiting, active, completed, failed, delayed] = await Promise.all([
            this.queue.getWaitingCount(),
            this.queue.getActiveCount(),
            this.queue.getCompletedCount(),
            this.queue.getFailedCount(),
            this.queue.getDelayedCount(),
        ])

        return {
            waiting,
            active,
            completed,
            failed,
            delayed,
            total: waiting + active + completed + failed + delayed,
        }
    }

    async pauseQueue(): Promise<void> {
        await this.queue.pause()
    }

    async resumeQueue(): Promise<void> {
        await this.queue.resume()
    }

    async clearQueue(): Promise<void> {
        await this.queue.empty()
    }

    private sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    private async notifyApp(messageId: string, status: string, error: string | null): Promise<void> {
        try {
            const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3004'

            await fetch(`${appUrl}/api/webhooks/whatsapp/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-service-secret': process.env.WHATSAPP_SERVICE_SECRET || '',
                },
                body: JSON.stringify({
                    messageId,
                    status,
                    error,
                    timestamp: new Date().toISOString(),
                }),
            })
        } catch (error) {
            console.error('Error notifying app:', error)
        }
    }
}
