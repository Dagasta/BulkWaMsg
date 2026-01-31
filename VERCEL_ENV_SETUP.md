# Vercel Environment Variables Setup

## How to Add Environment Variables in Vercel

1. Go to **https://vercel.com/dashboard**
2. Click on your **BulkWaMsg** project
3. Click **Settings** tab
4. Click **Environment Variables** in the left sidebar
5. For each variable below:
   - Enter the **Name** (e.g., `DATABASE_URL`)
   - Enter the **Value** (copy from below)
   - Select **Production**, **Preview**, and **Development** (all three)
   - Click **Add**

## Complete Environment Variables List

Copy and paste these one by one into Vercel:

### Database
```
Name: DATABASE_URL
Value: postgresql://neondb_owner:npg_eFPJqEO21iHj@ep-broad-leaf-agxvcqyw-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

### NextAuth (Authentication)
```
Name: NEXTAUTH_URL
Value: https://bulkwamsg.com
```

```
Name: NEXTAUTH_SECRET
Value: RYswsO3OAJwrXB1XN0i1FiIPjTprRTAU7nq2oL1PogU=
```

### PayPal (Payment Processing)
```
Name: PAYPAL_CLIENT_ID
Value: AfPwHm7PopY4cURjjKmCkRnp2gS5hFLnFgSqm1kEAHhmDLp4TPMf6RGTPTTtm7_XniZnb3dcXm3pK9Nk
```

```
Name: PAYPAL_CLIENT_SECRET
Value: EEsmIU85CqK7gp0nhG8Enjs0HCk1QYv3tB4TMRLSXyfiQd8FO_qDrsIL05Sedc2XNv9bbTNOs62yj6MM
```

```
Name: PAYPAL_MODE
Value: sandbox
```

```
Name: PAYPAL_WEBHOOK_ID
Value: your-webhook-id
```

```
Name: PAYPAL_MONTHLY_PLAN_ID
Value: P-2BF90720UB518380WNF6P5YY
```

```
Name: PAYPAL_YEARLY_PLAN_ID
Value: P-5CW44916SM670753MNF6QAYY
```

### Redis (Upstash)
```
Name: REDIS_URL
Value: rediss://default:AZr-AAIncDIxMmFmMGM3MWNmNDA0NTFmOTgwZTQyMjMxZmUwYzE2MXAyMzk2Nzg@direct-jackass-39678.upstash.io:6379
```

### WhatsApp Service
```
Name: WHATSAPP_SERVICE_URL
Value: http://localhost:3001
```

> **Note**: You'll need to update this to your production WhatsApp service URL when you deploy it.

```
Name: WHATSAPP_SERVICE_SECRET
Value: Ee99OkD+Vn64pr8OpOa9e7s177WPzA3m1k/A3BBJntdg=
```

### App Settings (Public Variables)
```
Name: NEXT_PUBLIC_APP_URL
Value: https://bulkwamsg.com
```

```
Name: NEXT_PUBLIC_APP_NAME
Value: BulkWaMsg
```

## After Adding All Variables

1. **Save** all variables
2. Go to **Deployments** tab
3. Click the **⋯** (three dots) on the latest deployment
4. Click **Redeploy**
5. Wait 2-5 minutes for deployment to complete

## Verify Deployment

After redeployment:
- Visit: **https://bulkwamsg.com/auth/login**
- Should load without 404 error
- Test login/registration flow

## Total Variables to Add

You should add **14 environment variables** in total:

- [x] DATABASE_URL
- [x] NEXTAUTH_URL
- [x] NEXTAUTH_SECRET
- [x] PAYPAL_CLIENT_ID
- [x] PAYPAL_CLIENT_SECRET
- [x] PAYPAL_MODE
- [x] PAYPAL_WEBHOOK_ID
- [x] PAYPAL_MONTHLY_PLAN_ID
- [x] PAYPAL_YEARLY_PLAN_ID
- [x] REDIS_URL
- [x] WHATSAPP_SERVICE_URL
- [x] WHATSAPP_SERVICE_SECRET
- [x] NEXT_PUBLIC_APP_URL
- [x] NEXT_PUBLIC_APP_NAME

## Quick Copy Format (Alternative)

If Vercel allows bulk import, you can try this format:

```env
DATABASE_URL="postgresql://neondb_owner:npg_eFPJqEO21iHj@ep-broad-leaf-agxvcqyw-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require"
NEXTAUTH_URL="https://bulkwamsg.com"
NEXTAUTH_SECRET="RYswsO3OAJwrXB1XN0i1FiIPjTprRTAU7nq2oL1PogU="
PAYPAL_CLIENT_ID="AfPwHm7PopY4cURjjKmCkRnp2gS5hFLnFgSqm1kEAHhmDLp4TPMf6RGTPTTtm7_XniZnb3dcXm3pK9Nk"
PAYPAL_CLIENT_SECRET="EEsmIU85CqK7gp0nhG8Enjs0HCk1QYv3tB4TMRLSXyfiQd8FO_qDrsIL05Sedc2XNv9bbTNOs62yj6MM"
PAYPAL_MODE="sandbox"
PAYPAL_WEBHOOK_ID="your-webhook-id"
PAYPAL_MONTHLY_PLAN_ID="P-2BF90720UB518380WNF6P5YY"
PAYPAL_YEARLY_PLAN_ID="P-5CW44916SM670753MNF6QAYY"
REDIS_URL="rediss://default:AZr-AAIncDIxMmFmMGM3MWNmNDA0NTFmOTgwZTQyMjMxZmUwYzE2MXAyMzk2Nzg@direct-jackass-39678.upstash.io:6379"
WHATSAPP_SERVICE_URL="http://localhost:3001"
WHATSAPP_SERVICE_SECRET="Ee99OkD+Vn64pr8OpOa9e7s177WPzA3m1k/A3BBJntdg="
NEXT_PUBLIC_APP_URL="https://bulkwamsg.com"
NEXT_PUBLIC_APP_NAME="BulkWaMsg"
```

---

**Important**: Make sure to select **Production**, **Preview**, and **Development** for each variable so they work in all environments!
