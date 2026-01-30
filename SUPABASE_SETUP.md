# Supabase Setup Guide for BulkWaMsg

## Step 1: Get Your Supabase Database URL

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project** (or create a new one if you don't have one)
3. **Go to Project Settings** (gear icon in the left sidebar)
4. **Click on "Database"** in the settings menu
5. **Scroll down to "Connection String"**
6. **Copy the "Connection pooling" URI** (it looks like this):
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
   ```

## Step 2: Configure Your .env File

1. **Open or create `.env` file** in your project root (`c:\Users\HP\Bulkwamsg\.env`)

2. **Add your Supabase connection string**:
   ```bash
   # Database (Supabase)
   DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3004"
   NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"
   
   # PayPal (get these from PayPal Developer Dashboard)
   PAYPAL_CLIENT_ID="your-paypal-client-id"
   PAYPAL_CLIENT_SECRET="your-paypal-client-secret"
   PAYPAL_MODE="sandbox"
   PAYPAL_WEBHOOK_ID="your-webhook-id"
   
   # Redis (you can use Upstash Redis for free)
   REDIS_URL="redis://localhost:6379"
   
   # WhatsApp Service
   WHATSAPP_SERVICE_URL="http://localhost:3001"
   WHATSAPP_SERVICE_SECRET="generate-a-random-secret-here"
   
   # App Settings
   NEXT_PUBLIC_APP_URL="http://localhost:3004"
   NEXT_PUBLIC_APP_NAME="BulkWaMsg"
   ```

3. **Generate NEXTAUTH_SECRET**:
   - Open PowerShell and run:
     ```powershell
     [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
     ```
   - Copy the output and paste it as your NEXTAUTH_SECRET

## Step 3: Update Prisma Schema for Supabase

The current schema should work fine with Supabase, but let's make sure it's optimized:

1. **Open `prisma/schema.prisma`**
2. **The datasource should already be set to PostgreSQL** (which is what Supabase uses)

## Step 4: Push Database Schema to Supabase

Run this command to create all the tables in your Supabase database:

```bash
npx prisma db push
```

This will:
- Connect to your Supabase database
- Create all the tables (User, Subscription, WhatsAppSession, Contact, Campaign, etc.)
- Set up all relationships and indexes

## Step 5: Verify in Supabase Dashboard

1. **Go back to Supabase Dashboard**
2. **Click on "Table Editor"** in the left sidebar
3. **You should see all your tables**:
   - User
   - Subscription
   - WhatsAppSession
   - Contact
   - ContactGroup
   - ContactGroupMember
   - Campaign
   - CampaignTarget
   - Message
   - Template
   - Analytics

## Step 6: Optional - Set Up Redis (for Message Queue)

You have two options:

### Option A: Local Redis (for development)
1. **Install Redis on Windows**:
   - Download from: https://github.com/microsoftarchive/redis/releases
   - Or use WSL2 with Redis
   - Or use Docker: `docker run -d -p 6379:6379 redis`

### Option B: Upstash Redis (free cloud option - RECOMMENDED)
1. **Go to**: https://upstash.com/
2. **Sign up** for free account
3. **Create a new Redis database**
4. **Copy the connection string** (looks like: `redis://default:xxx@xxx.upstash.io:6379`)
5. **Update REDIS_URL in your `.env` file**

## Step 7: Start the Application

Now you're ready to run the app:

**Terminal 1 - Next.js App:**
```bash
npm run dev
```

**Terminal 2 - WhatsApp Service:**
```bash
npm run whatsapp:dev
```

## Troubleshooting

### If you get "Connection pool timeout" error:
Add `?connection_limit=1` to your DATABASE_URL

### If you get "SSL required" error:
Add `?sslmode=require` to your DATABASE_URL

### If Prisma can't connect:
Make sure you're using the **Connection Pooling** URL, not the direct connection URL

## Summary

✅ **What you need from Supabase:**
- Database connection string (from Project Settings → Database)

✅ **What you need to set up separately:**
- Redis (use Upstash for free cloud option)
- PayPal credentials (if you want to test subscriptions)

✅ **Commands to run:**
1. Create `.env` file with your Supabase URL
2. Run `npx prisma db push`
3. Run `npm run dev` and `npm run whatsapp:dev`

That's it! Your BulkWaMsg platform will be connected to Supabase! 🚀
