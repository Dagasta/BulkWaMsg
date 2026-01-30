import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { WhatsAppClientManager } from './client-manager'
import { MessageQueue } from './message-queue'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3004',
        methods: ['GET', 'POST'],
    },
})

app.use(express.json())

const clientManager = new WhatsAppClientManager(io)
const messageQueue = new MessageQueue(clientManager)

// Middleware to verify requests from Next.js app
const verifySecret = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const secret = req.headers['x-service-secret']

    if (secret !== process.env.WHATSAPP_SERVICE_SECRET) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    next()
}

app.use(verifySecret)

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Initialize WhatsApp session
app.post('/session/init', async (req, res) => {
    try {
        const { sessionId, userId } = req.body

        if (!sessionId || !userId) {
            return res.status(400).json({ error: 'Missing sessionId or userId' })
        }

        await clientManager.initializeClient(sessionId, userId)

        res.json({ success: true, message: 'Session initialization started' })
    } catch (error: any) {
        console.error('Error initializing session:', error)
        res.status(500).json({ error: error.message })
    }
})

// Get session status
app.get('/session/:sessionId/status', async (req, res) => {
    try {
        const { sessionId } = req.params
        const status = await clientManager.getClientStatus(sessionId)

        res.json(status)
    } catch (error: any) {
        console.error('Error getting session status:', error)
        res.status(500).json({ error: error.message })
    }
})

// Get QR code
app.get('/session/:sessionId/qr', async (req, res) => {
    try {
        const { sessionId } = req.params
        const qrCode = await clientManager.getQRCode(sessionId)

        if (!qrCode) {
            return res.status(404).json({ error: 'QR code not available' })
        }

        res.json({ qrCode })
    } catch (error: any) {
        console.error('Error getting QR code:', error)
        res.status(500).json({ error: error.message })
    }
})

// Disconnect session
app.post('/session/:sessionId/disconnect', async (req, res) => {
    try {
        const { sessionId } = req.params
        await clientManager.disconnectClient(sessionId)

        res.json({ success: true, message: 'Session disconnected' })
    } catch (error: any) {
        console.error('Error disconnecting session:', error)
        res.status(500).json({ error: error.message })
    }
})

// Send message
app.post('/message/send', async (req, res) => {
    try {
        const { sessionId, phoneNumber, message, messageId } = req.body

        if (!sessionId || !phoneNumber || !message || !messageId) {
            return res.status(400).json({ error: 'Missing required fields' })
        }

        await messageQueue.addMessage({
            sessionId,
            phoneNumber,
            message,
            messageId,
        })

        res.json({ success: true, message: 'Message queued for sending' })
    } catch (error: any) {
        console.error('Error queuing message:', error)
        res.status(500).json({ error: error.message })
    }
})

// Get queue stats
app.get('/queue/stats', async (req, res) => {
    try {
        const stats = await messageQueue.getStats()
        res.json(stats)
    } catch (error: any) {
        console.error('Error getting queue stats:', error)
        res.status(500).json({ error: error.message })
    }
})

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)

    socket.on('subscribe', (sessionId: string) => {
        socket.join(`session:${sessionId}`)
        console.log(`Client subscribed to session: ${sessionId}`)
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
    })
})

const PORT = process.env.WHATSAPP_SERVICE_PORT || 3001

httpServer.listen(PORT, () => {
    console.log(`🚀 WhatsApp service running on port ${PORT}`)
})

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully...')
    await clientManager.disconnectAll()
    httpServer.close(() => {
        console.log('Server closed')
        process.exit(0)
    })
})
