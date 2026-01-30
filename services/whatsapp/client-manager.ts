import { Client, LocalAuth, Message as WAMessage } from 'whatsapp-web.js'
import QRCode from 'qrcode'
import { Server as SocketIOServer } from 'socket.io'
import path from 'path'
import fs from 'fs'

interface ClientData {
    client: Client
    status: 'CONNECTING' | 'QR_READY' | 'CONNECTED' | 'DISCONNECTED' | 'FAILED'
    qrCode: string | null
    userId: string
    phoneNumber: string | null
    lastSeen: Date | null
}

export class WhatsAppClientManager {
    private clients: Map<string, ClientData> = new Map()
    private io: SocketIOServer

    constructor(io: SocketIOServer) {
        this.io = io
        this.ensureSessionsDir()
    }

    private ensureSessionsDir() {
        const sessionsDir = path.join(process.cwd(), 'sessions')
        if (!fs.existsSync(sessionsDir)) {
            fs.mkdirSync(sessionsDir, { recursive: true })
        }
    }

    async initializeClient(sessionId: string, userId: string): Promise<void> {
        // Check if client already exists
        if (this.clients.has(sessionId)) {
            const existing = this.clients.get(sessionId)!
            if (existing.status === 'CONNECTED' || existing.status === 'CONNECTING') {
                return
            }
            // Cleanup existing client
            await this.disconnectClient(sessionId)
        }


        const client = new Client({
            authStrategy: new LocalAuth({
                clientId: sessionId,
                dataPath: path.join(process.cwd(), 'sessions'),
            }),
            puppeteer: {
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--disable-gpu',
                    '--disable-web-security',
                    '--disable-features=IsolateOrigins,site-per-process',
                ],
                timeout: 60000,
            },
        })

        const clientData: ClientData = {
            client,
            status: 'CONNECTING',
            qrCode: null,
            userId,
            phoneNumber: null,
            lastSeen: null,
        }

        this.clients.set(sessionId, clientData)

        // Event: QR Code
        client.on('qr', async (qr) => {
            console.log(`QR code generated for session: ${sessionId}`)

            try {
                const qrCodeDataURL = await QRCode.toDataURL(qr)
                clientData.qrCode = qrCodeDataURL
                clientData.status = 'QR_READY'

                // Emit to frontend via Socket.IO
                this.io.to(`session:${sessionId}`).emit('qr', { qrCode: qrCodeDataURL })

                // Notify Next.js app via webhook
                await this.notifyApp(sessionId, 'qr_ready', { qrCode: qrCodeDataURL })
            } catch (error) {
                console.error('Error generating QR code:', error)
            }
        })

        // Event: Ready (authenticated)
        client.on('ready', async () => {
            console.log(`Client ready for session: ${sessionId}`)

            const info = client.info
            clientData.status = 'CONNECTED'
            clientData.phoneNumber = info.wid.user
            clientData.lastSeen = new Date()
            clientData.qrCode = null

            this.io.to(`session:${sessionId}`).emit('ready', {
                phoneNumber: info.wid.user,
            })

            await this.notifyApp(sessionId, 'connected', {
                phoneNumber: info.wid.user,
            })
        })

        // Event: Authenticated
        client.on('authenticated', () => {
            console.log(`Client authenticated for session: ${sessionId}`)
        })

        // Event: Authentication failure
        client.on('auth_failure', async (msg) => {
            console.error(`Authentication failed for session: ${sessionId}`, msg)
            clientData.status = 'FAILED'

            this.io.to(`session:${sessionId}`).emit('auth_failure', { message: msg })
            await this.notifyApp(sessionId, 'auth_failed', { error: msg })
        })

        // Event: Disconnected
        client.on('disconnected', async (reason) => {
            console.log(`Client disconnected for session: ${sessionId}`, reason)
            clientData.status = 'DISCONNECTED'

            this.io.to(`session:${sessionId}`).emit('disconnected', { reason })
            await this.notifyApp(sessionId, 'disconnected', { reason })
        })

        // Event: Message acknowledgement
        client.on('message_ack', async (msg: WAMessage, ack) => {
            // ack values: 1 = sent, 2 = delivered, 3 = read
            const status = ack === 1 ? 'SENT' : ack === 2 ? 'DELIVERED' : ack === 3 ? 'READ' : 'UNKNOWN'

            await this.notifyApp(sessionId, 'message_ack', {
                messageId: msg.id.id,
                status,
            })
        })

        // Initialize client
        try {
            console.log(`Initializing WhatsApp client for session: ${sessionId}`)
            await client.initialize()
            console.log(`Successfully initialized client for session: ${sessionId}`)
        } catch (error: any) {
            console.error(`Error initializing client for session: ${sessionId}`)
            console.error('Error details:', error.message)
            console.error('Full error:', error)
            clientData.status = 'FAILED'
            throw error
        }
    }

    async disconnectClient(sessionId: string): Promise<void> {
        const clientData = this.clients.get(sessionId)

        if (!clientData) {
            return
        }

        try {
            await clientData.client.destroy()
            this.clients.delete(sessionId)

            await this.notifyApp(sessionId, 'disconnected', {})
        } catch (error) {
            console.error(`Error disconnecting client for session: ${sessionId}`, error)
        }
    }

    async disconnectAll(): Promise<void> {
        const promises = Array.from(this.clients.keys()).map(sessionId =>
            this.disconnectClient(sessionId)
        )
        await Promise.all(promises)
    }

    async sendMessage(sessionId: string, phoneNumber: string, message: string): Promise<boolean> {
        const clientData = this.clients.get(sessionId)

        if (!clientData || clientData.status !== 'CONNECTED') {
            throw new Error('Client not connected')
        }

        try {
            // Format phone number (remove + and add @c.us)
            const formattedNumber = phoneNumber.replace(/\D/g, '') + '@c.us'

            await clientData.client.sendMessage(formattedNumber, message)
            clientData.lastSeen = new Date()

            return true
        } catch (error) {
            console.error(`Error sending message for session: ${sessionId}`, error)
            throw error
        }
    }

    async getClientStatus(sessionId: string): Promise<any> {
        const clientData = this.clients.get(sessionId)

        if (!clientData) {
            return { status: 'NOT_FOUND' }
        }

        return {
            status: clientData.status,
            phoneNumber: clientData.phoneNumber,
            lastSeen: clientData.lastSeen,
            hasQR: !!clientData.qrCode,
        }
    }

    async getQRCode(sessionId: string): Promise<string | null> {
        const clientData = this.clients.get(sessionId)
        return clientData?.qrCode || null
    }

    getClient(sessionId: string): Client | null {
        return this.clients.get(sessionId)?.client || null
    }

    private async notifyApp(sessionId: string, event: string, data: any): Promise<void> {
        try {
            const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3004'

            await fetch(`${appUrl}/api/webhooks/whatsapp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-service-secret': process.env.WHATSAPP_SERVICE_SECRET || '',
                },
                body: JSON.stringify({
                    sessionId,
                    event,
                    data,
                    timestamp: new Date().toISOString(),
                }),
            })
        } catch (error) {
            console.error('Error notifying app:', error)
        }
    }
}
