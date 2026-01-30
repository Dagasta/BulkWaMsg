# BulkWaMsg - WhatsApp Bulk Messaging Platform

A comprehensive SaaS platform for sending bulk WhatsApp messages with multi-account support, contact management, campaign automation, and real-time analytics.

## Features

- 🔐 **User Authentication** - Secure login and registration with NextAuth.js
- 📱 **Multi-Account Support** - Connect multiple WhatsApp accounts via QR code
- 👥 **Contact Management** - Import, organize, and segment contacts
- 📨 **Campaign Management** - Create, schedule, and automate bulk messaging
- 📊 **Real-time Analytics** - Track delivery rates and campaign performance
- 💳 **PayPal Integration** - Subscription management with multiple tiers
- 🛡️ **Anti-Ban Protection** - Intelligent rate limiting to protect accounts
- ⚡ **Message Queue** - Bull queue with Redis for reliable message delivery

## Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM, PostgreSQL
- **Authentication**: NextAuth.js v5
- **WhatsApp**: whatsapp-web.js with Puppeteer
- **Payments**: PayPal Checkout SDK
- **Queue**: Bull with Redis
- **Real-time**: Socket.IO

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Redis server
- PayPal developer account (for subscriptions)

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/bulkwamsg.git
cd bulkwamsg
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
- Database URL (PostgreSQL)
- NextAuth secret and URL
- PayPal credentials
- Redis URL
- WhatsApp service secret

4. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development servers**

Terminal 1 - Next.js app:
```bash
npm run dev
```

Terminal 2 - WhatsApp service:
```bash
npm run whatsapp:dev
```

6. **Access the application**
- Frontend: http://localhost:3004
- WhatsApp Service: http://localhost:3001

## Project Structure

```
bulkwamsg/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   ├── auth/                 # Authentication pages
│   ├── dashboard/            # Dashboard pages
│   └── page.tsx              # Landing page
├── components/               # React components
│   └── ui/                   # UI components
├── lib/                      # Utility libraries
│   ├── auth.ts               # NextAuth configuration
│   ├── paypal.ts             # PayPal integration
│   ├── prisma.ts             # Prisma client
│   └── utils.ts              # Utility functions
├── prisma/                   # Database schema
│   └── schema.prisma
├── services/                 # External services
│   └── whatsapp/             # WhatsApp service
│       ├── server.ts         # Express server
│       ├── client-manager.ts # Client lifecycle
│       └── message-queue.ts  # Message queue
└── types/                    # TypeScript types
```

## Usage

### 1. Register an Account
- Visit http://localhost:3000
- Click "Get Started" or "Sign Up"
- Create your account (starts with free plan)

### 2. Connect WhatsApp
- Go to Dashboard → WhatsApp
- Click "Connect New WhatsApp Account"
- Scan the QR code with WhatsApp mobile app
- Wait for connection confirmation

### 3. Import Contacts
- Go to Dashboard → Contacts
- Upload CSV file or add manually
- Organize into groups

### 4. Create Campaign
- Go to Dashboard → Campaigns
- Create new campaign
- Select contacts/groups
- Write message or use template
- Schedule or send immediately

### 5. Monitor Performance
- View real-time delivery status
- Track campaign analytics
- Monitor message limits

## PayPal Setup

1. Create a PayPal developer account
2. Create subscription plans in PayPal dashboard
3. Add plan IDs to environment variables:
   - `PAYPAL_STARTER_PLAN_ID`
   - `PAYPAL_PROFESSIONAL_PLAN_ID`
   - `PAYPAL_ENTERPRISE_PLAN_ID`

## Deployment

### Vercel (Frontend)
```bash
vercel deploy
```

### Railway/Render (WhatsApp Service)
- Deploy the WhatsApp service separately
- Ensure persistent storage for sessions
- Set environment variables

### Docker
```bash
docker-compose up -d
```

## API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login (via NextAuth)

### WhatsApp
- `GET /api/whatsapp/sessions` - Get user sessions
- `POST /api/whatsapp/connect` - Connect new session
- `POST /api/whatsapp/disconnect` - Disconnect session

### Contacts
- `GET /api/contacts` - Get contacts
- `POST /api/contacts` - Create contact
- `POST /api/contacts/import` - Import CSV

### Campaigns
- `GET /api/campaigns` - Get campaigns
- `POST /api/campaigns` - Create campaign
- `POST /api/campaigns/[id]/send` - Send campaign

## Security

- All passwords are hashed with bcrypt
- JWT sessions with NextAuth.js
- API routes protected with middleware
- WhatsApp service authenticated with secret
- Rate limiting on message sending
- Input validation with Zod

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- GitHub Issues: https://github.com/yourusername/bulkwamsg/issues
- Email: support@bulkwamsg.com

## Acknowledgments

- whatsapp-web.js for WhatsApp integration
- Next.js team for the amazing framework
- shadcn/ui for beautiful components
