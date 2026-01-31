# 🚀 BulkWaMsg - Vercel Deployment Guide

## ✅ Code Successfully Pushed to GitHub!

**Repository**: https://github.com/Dagasta/BulkWaMsg.git

---

## 📋 Step-by-Step Vercel Deployment (5 minutes)

### **Step 1: Go to Vercel**
1. Visit: https://vercel.com
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub

---

### **Step 2: Import Your Project**
1. Click **"Add New..."** → **"Project"**
2. Find **"BulkWaMsg"** in the list
3. Click **"Import"**

---

### **Step 3: Configure Project**

**Framework Preset**: Next.js (auto-detected) ✅

**Root Directory**: `./` (leave as default) ✅

**Build Settings**: (leave as default)
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

---

### **Step 4: Add Environment Variables**

Click **"Environment Variables"** and add these:

```bash
# Database
DATABASE_URL=postgresql://neondb_owner:npg_eFPJqEO21iHj@ep-broad-leaf-agxvcqyw-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require

# Redis
REDIS_URL=rediss://default:AZr-AAIncDIxMmFmMGM3MWNmNDA0NTFmOTgwZTQyMjMxZmUwYzE2MXAyMzk2Nzg@direct-jackass-39678.upstash.io:6379

# NextAuth
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=RYswsO3OAJwrXB1XN0i1FiIPjTprRTAU7nq2oL1PogU=

# PayPal
PAYPAL_CLIENT_ID=AfPwHm7PopY4cURjjKmCkRnp2gS5hFLnFgSqm1kEAHhmDLp4TPMf6RGTPTTtm7_XniZnb3dcXm3pK9Nk
PAYPAL_CLIENT_SECRET=EEsmIU85CqK7gp0nhG8Enjs0HCk1QYv3tB4TMRLSXyfiQd8FO_qDrsIL05Sedc2XNv9bbTNOs62yj6MM
PAYPAL_MODE=sandbox
PAYPAL_WEBHOOK_ID=your-webhook-id
PAYPAL_MONTHLY_PLAN_ID=P-2BF90720UB518380WNF6P5YY
PAYPAL_YEARLY_PLAN_ID=P-5CW44916SM670753MNF6QAYY

# App URLs
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME=BulkWaMsg

# WhatsApp Service
WHATSAPP_SERVICE_URL=https://your-domain.com
WHATSAPP_SERVICE_SECRET=super-secret-key-change-this-in-production
```

**IMPORTANT**: 
- Replace `https://your-domain.com` with your actual domain
- For first deployment, you can use the Vercel URL (like `https://bulkwamsg.vercel.app`)
- Update `PAYPAL_MODE` to `live` when ready for production

---

### **Step 5: Deploy!**
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. You'll see: ✅ **"Congratulations! Your project has been deployed"**
4. Click **"Visit"** to see your live site!

---

## 🌐 Connect Your Namecheap Domain

### **In Vercel:**
1. Go to your project
2. Click **"Settings"** → **"Domains"**
3. Enter your domain: `yourdomain.com`
4. Click **"Add"**

### **In Namecheap:**
1. Go to https://namecheap.com
2. **Domain List** → **Manage** → **Advanced DNS**
3. Add these records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | Automatic |
| CNAME | www | cname.vercel-dns.com | Automatic |

4. **Save All Changes**
5. Wait 10-30 minutes for DNS propagation

---

## 🔄 Update Environment Variables After Domain

Once your domain is connected, update these in Vercel:

1. Go to **Settings** → **Environment Variables**
2. Edit these variables:
   - `NEXTAUTH_URL` → `https://yourdomain.com`
   - `NEXT_PUBLIC_APP_URL` → `https://yourdomain.com`
   - `WHATSAPP_SERVICE_URL` → `https://yourdomain.com`
3. Click **"Save"**
4. Go to **Deployments** → Click **"..."** → **"Redeploy"**

---

## 🎯 Deploy WhatsApp Service Separately

The WhatsApp service needs to run on a separate server (it uses Puppeteer/Chrome).

### **Option A: Railway.app (Recommended)**

1. Go to: https://railway.app
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select **"BulkWaMsg"**
4. Set **Start Command**: `npm run whatsapp:dev`
5. Add environment variables (same as above)
6. Deploy!
7. Copy the Railway URL (e.g., `https://bulkwamsg-production.up.railway.app`)
8. Update `WHATSAPP_SERVICE_URL` in Vercel with this URL

### **Option B: Render.com**

1. Go to: https://render.com
2. **New** → **Web Service**
3. Connect GitHub repo
4. **Start Command**: `npm run whatsapp:dev`
5. Add environment variables
6. Deploy!

---

## ✅ Final Checklist

- [ ] Code pushed to GitHub ✅ (DONE!)
- [ ] Deployed to Vercel
- [ ] Environment variables added
- [ ] Domain connected in Namecheap
- [ ] DNS records added
- [ ] Domain added in Vercel
- [ ] Environment variables updated with domain
- [ ] WhatsApp service deployed separately
- [ ] Tested live site
- [ ] PayPal payments working

---

## 🧪 Test Your Live Site

1. Visit: `https://yourdomain.com`
2. Click **"Sign Up"**
3. Create account
4. Go to **"WhatsApp"** page
5. Click **"Subscribe with PayPal"**
6. Complete payment (use PayPal sandbox for testing)
7. QR code should appear!
8. Scan with WhatsApp
9. Start sending messages!

---

## 🔧 Troubleshooting

**Build Failed?**
- Check environment variables are correct
- Make sure all dependencies are in `package.json`
- Check build logs in Vercel

**Database Connection Error?**
- Verify `DATABASE_URL` is correct
- Make sure Neon.tech database is active
- Check if IP is whitelisted (Neon allows all by default)

**PayPal Not Working?**
- Verify `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET`
- Check `PAYPAL_MODE` (sandbox for testing, live for production)
- Verify Plan IDs are correct

**Domain Not Working?**
- Wait 30 minutes for DNS propagation
- Check DNS with: https://dnschecker.org
- Verify DNS records in Namecheap

---

## 🎊 You're Live!

Your BulkWaMsg platform is now:
- ✅ Deployed to Vercel
- ✅ Connected to custom domain
- ✅ Using Neon.tech PostgreSQL
- ✅ PayPal payments ready
- ✅ SEO optimized
- ✅ Ready to make money!

---

**Need help? Check the logs in Vercel dashboard or contact support!** 🚀
