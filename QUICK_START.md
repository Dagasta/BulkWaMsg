# Quick Start Guide - Get Your WhatsApp QR Code

## 🎯 To See the QR Code:

### Step 1: Create an Account
1. Open http://localhost:3004 in your browser
2. Click **"Get Started"** or **"Sign Up"**
3. Fill in:
   - Name: Your name
   - Email: your@email.com
   - Password: (any password you want)
4. Click **"Sign Up"**

### Step 2: Login
1. After signing up, you'll be redirected to login
2. Enter your email and password
3. Click **"Sign In"**

### Step 3: Go to WhatsApp Page
1. Once logged in, you'll see the **Dashboard**
2. Look at the **left sidebar**
3. Click on **"WhatsApp"** (has a phone icon 📱)

### Step 4: Connect WhatsApp
1. You'll see a form that says **"Connect New WhatsApp Account"**
2. Enter a name (e.g., "My Business Account")
3. Click **"Connect"**
4. **The QR Code will appear!** 📱

### Step 5: Scan QR Code
1. Open WhatsApp on your phone
2. Go to **Settings** → **Linked Devices**
3. Tap **"Link a Device"**
4. Scan the QR code on your screen
5. ✅ Connected!

---

## ⚠️ Current Issue: Redis Not Running

The WhatsApp service needs Redis for the message queue. Here's what to do:

### Quick Fix - Install Redis:

**Option 1: Use Docker (Easiest)**
```powershell
docker run -d -p 6379:6379 redis
```

**Option 2: Download Redis for Windows**
1. Go to: https://github.com/tporadowski/redis/releases
2. Download the latest .msi file
3. Install it
4. Redis will start automatically

**Option 3: Skip Redis for Now (Testing Only)**
I can modify the code to work without Redis temporarily, but you won't be able to send bulk messages.

---

## 🚀 What Works Without Redis:

✅ User registration and login
✅ Dashboard
✅ Contact management
✅ Campaign creation (but not sending)

## ❌ What Needs Redis:

❌ WhatsApp QR code generation
❌ Sending bulk messages
❌ Message queue

---

## 💡 Recommendation:

**Install Redis using Docker** (if you have Docker):
```powershell
docker run -d --name redis -p 6379:6379 redis
```

Then restart the WhatsApp service:
```powershell
npm run whatsapp:dev
```

**Let me know if you want me to:**
1. Help you install Redis
2. Modify the code to work without Redis (temporary solution)
3. Use a cloud Redis (Upstash - free)
