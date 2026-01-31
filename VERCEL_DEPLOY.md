# Vercel Deployment - Quick Reference

## Automatic Deployment

Your changes are already pushed to GitHub (commit `e6bf317`). Vercel should automatically deploy them.

## Check Deployment Status

1. Go to: https://vercel.com/dashboard
2. Find your **BulkWaMsg** project
3. Check the latest deployment status

## CRITICAL: Update Environment Variables

> **You MUST update these in Vercel for production to work:**

1. Go to Vercel project → **Settings** → **Environment Variables**
2. Update these variables:

```bash
NEXTAUTH_URL=https://bulkwamsg.com
NEXT_PUBLIC_APP_URL=https://bulkwamsg.com
```

3. Click **Save**
4. **Redeploy** the application

## Force Redeploy (if needed)

### Option 1: Vercel Dashboard
- Go to **Deployments** tab
- Click **⋯** on latest deployment
- Click **Redeploy**

### Option 2: Git Push
```bash
git commit --allow-empty -m "Trigger deployment"
git push
```

## Test Production

After deployment completes:

1. Visit: `https://bulkwamsg.com/auth/login`
2. Create account: `https://bulkwamsg.com/auth/register`
3. Test login flow

## Troubleshooting

- **Build failed**: Check Vercel build logs
- **404 error**: Wait for deployment to complete, then hard refresh (Ctrl+Shift+R)
- **Login not working**: Verify `NEXTAUTH_URL` is set to `https://bulkwamsg.com` in Vercel

## Timeline

- Automatic deployment: **2-5 minutes** after push
- Build time: **1-3 minutes**
- Total: **~5-10 minutes** to live

Your fixes are ready for production! 🚀
