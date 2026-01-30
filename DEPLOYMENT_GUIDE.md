# Connecting Your Namecheap Domain to BulkWaMsg

## 🎯 Quick Guide: Deploy to Vercel + Connect Namecheap Domain

---

## Step 1: Deploy to Vercel (5 minutes)

### **1.1 Push Code to GitHub**
```bash
# In your project folder
git init
git add .
git commit -m "Initial commit - BulkWaMsg platform"
git branch -M main
git remote add origin https://github.com/yourusername/bulkwamsg.git
git push -u origin main
```

### **1.2 Deploy to Vercel**
1. Go to: https://vercel.com
2. Click **"Sign Up"** (use GitHub)
3. Click **"New Project"**
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next
6. Add **Environment Variables** (click "Environment Variables"):
   ```
   DATABASE_URL=your-postgres-url
   REDIS_URL=your-redis-url
   NEXTAUTH_URL=https://yourdomain.com
   NEXTAUTH_SECRET=your-secret
   PAYPAL_CLIENT_ID=AfPwHm7PopY4cURjjKmCkRnp2gS5hFLnFgSqm1kEAHhmDLp4TPMf6RGTPTTtm7_XniZnb3dcXm3pK9Nk
   PAYPAL_CLIENT_SECRET=EEsmIU85CqK7gp0nhG8Enjs0HCk1QYv3tB4TMRLSXyfiQd8FO_qDrsIL05Sedc2XNv9bbTNOs62yj6MM
   PAYPAL_MODE=live
   PAYPAL_MONTHLY_PLAN_ID=P-2BF90720UB518380WNF6P5YY
   PAYPAL_YEARLY_PLAN_ID=P-5CW44916SM670753MNF6QAYY
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   WHATSAPP_SERVICE_URL=https://yourdomain.com
   WHATSAPP_SERVICE_SECRET=your-secret
   ```
7. Click **"Deploy"**
8. Wait 2-3 minutes for deployment
9. You'll get a URL like: `https://bulkwamsg.vercel.app`

---

## Step 2: Connect Namecheap Domain (3 minutes)

### **2.1 In Vercel Dashboard**
1. Go to your project in Vercel
2. Click **"Settings"** tab
3. Click **"Domains"** in the left sidebar
4. Enter your domain: `yourdomain.com`
5. Click **"Add"**
6. Vercel will show you DNS records to add

### **2.2 In Namecheap Dashboard**
1. Go to: https://namecheap.com
2. Click **"Domain List"**
3. Click **"Manage"** next to your domain
4. Click **"Advanced DNS"** tab
5. Click **"Add New Record"**

### **2.3 Add DNS Records**

**For Root Domain (yourdomain.com):**
- **Type**: A Record
- **Host**: @
- **Value**: `76.76.21.21` (Vercel's IP)
- **TTL**: Automatic

**For www Subdomain (www.yourdomain.com):**
- **Type**: CNAME Record
- **Host**: www
- **Value**: `cname.vercel-dns.com`
- **TTL**: Automatic

### **2.4 Save Changes**
1. Click **"Save All Changes"**
2. Wait 5-30 minutes for DNS propagation
3. Your domain will be live!

---

## Step 3: Update PayPal URLs (2 minutes)

After your domain is live, update PayPal:

1. Go to: https://developer.paypal.com/dashboard/
2. Go to your subscription plans
3. Update **Return URL** to: `https://yourdomain.com/api/subscription/success`
4. Update **Cancel URL** to: `https://yourdomain.com/dashboard/whatsapp`

---

## Step 4: Deploy WhatsApp Service

The WhatsApp service needs to run separately. Options:

### **Option A: Railway.app (Recommended - Free)**
1. Go to: https://railway.app
2. Click **"Start a New Project"**
3. Click **"Deploy from GitHub repo"**
4. Select your repo
5. Add environment variables
6. Deploy!

### **Option B: Render.com (Free)**
1. Go to: https://render.com
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub repo
4. Set **Start Command**: `npm run whatsapp:dev`
5. Add environment variables
6. Deploy!

---

## 🎯 Final Checklist

- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Domain added in Vercel
- [ ] DNS records added in Namecheap
- [ ] Environment variables configured
- [ ] PayPal URLs updated
- [ ] WhatsApp service deployed
- [ ] Test the live site!

---

## 🔍 Verify It's Working

1. Visit: `https://yourdomain.com`
2. Sign up for account
3. Go to WhatsApp page
4. Click "Subscribe with PayPal"
5. Complete payment
6. QR code should appear!

---

## ⚡ Quick DNS Settings (Copy-Paste)

**What domain do you have?** Tell me and I'll give you the exact DNS records to add!

Example: If your domain is `bulkwamsg.com`:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | Automatic |
| CNAME | www | cname.vercel-dns.com | Automatic |

---

## 🆘 Troubleshooting

**Domain not working after 30 minutes?**
- Check DNS propagation: https://dnschecker.org
- Make sure you saved changes in Namecheap
- Try clearing browser cache

**SSL certificate error?**
- Wait 24 hours for SSL to provision
- Vercel automatically adds SSL

---

**What's your domain name? I'll give you the exact DNS records to add!** 🚀
