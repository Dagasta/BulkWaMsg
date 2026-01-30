# PayPal Setup Guide for BulkWaMsg

## 🎯 Setting Up PayPal Subscriptions

You need to create two subscription plans in PayPal:
1. **Monthly Plan**: $10/month
2. **Yearly Plan**: $120/year

---

## Step 1: Go to PayPal Developer Dashboard

1. Go to: https://developer.paypal.com/dashboard/
2. Login with your PayPal account
3. Switch to **"Sandbox"** mode for testing (or "Live" for production)

---

## Step 2: Get API Credentials

1. Click on **"Apps & Credentials"** in the left menu
2. Click **"Create App"**
3. Name it: `BulkWaMsg`
4. Click **"Create App"**
5. Copy the **Client ID** and **Secret**
6. Update your `.env` file:
   ```bash
   PAYPAL_CLIENT_ID="your-client-id-here"
   PAYPAL_CLIENT_SECRET="your-secret-here"
   PAYPAL_MODE="sandbox"  # or "live" for production
   ```

---

## Step 3: Create Subscription Plans

### Create Monthly Plan ($10/month):

1. In PayPal Dashboard, go to **"Products & Services"** → **"Subscriptions"**
2. Click **"Create Plan"**
3. Fill in:
   - **Plan Name**: BulkWaMsg Monthly
   - **Plan ID**: `P-MONTHLY-10USD` (copy this exactly)
   - **Description**: Monthly subscription for BulkWaMsg
4. **Billing Cycle**:
   - **Frequency**: Monthly
   - **Pricing**: $10 USD
   - **Tenure**: Ongoing (no end date)
5. Click **"Save"**
6. **Activate the plan**

### Create Yearly Plan ($120/year):

1. Click **"Create Plan"** again
2. Fill in:
   - **Plan Name**: BulkWaMsg Yearly
   - **Plan ID**: `P-YEARLY-120USD` (copy this exactly)
   - **Description**: Yearly subscription for BulkWaMsg (Save 17%)
3. **Billing Cycle**:
   - **Frequency**: Yearly
   - **Pricing**: $120 USD
   - **Tenure**: Ongoing (no end date)
4. Click **"Save"**
5. **Activate the plan**

---

## Step 4: Update .env File

Update your `.env` file with the Plan IDs:

```bash
# PayPal Subscription Plan IDs
PAYPAL_MONTHLY_PLAN_ID="P-MONTHLY-10USD"
PAYPAL_YEARLY_PLAN_ID="P-YEARLY-120USD"
```

---

## Step 5: Test the Payment Flow

1. **Restart your app**:
   ```powershell
   # Stop the current dev server (Ctrl+C)
   npm run dev
   ```

2. **Go to WhatsApp page**:
   - http://localhost:3004/dashboard/whatsapp

3. **You should see the pricing page**

4. **Click "Subscribe with PayPal"**

5. **You'll be redirected to PayPal sandbox**
   - Use test credentials to complete payment
   - PayPal test buyer accounts: https://developer.paypal.com/dashboard/accounts

6. **After payment, you'll be redirected back**
   - Your subscription will be activated
   - You can now scan QR codes!

---

## 🎉 You're Done!

Users can now:
1. Sign up for an account
2. Choose Monthly ($10) or Yearly ($120) plan
3. Pay via PayPal
4. Get instant access to WhatsApp QR code scanning
5. Start sending bulk messages!

---

## 💡 For Production:

1. Switch `PAYPAL_MODE="live"` in `.env`
2. Create the same plans in **Live** mode (not Sandbox)
3. Use your **Live** API credentials
4. Deploy your app!

---

## Troubleshooting:

- **"Failed to create subscription"**: Check your PayPal API credentials
- **"Invalid plan"**: Make sure Plan IDs match exactly in PayPal and `.env`
- **Payment not activating**: Check the success callback URL is correct
