import paypal from '@paypal/checkout-server-sdk'

const environment = () => {
    const clientId = process.env.PAYPAL_CLIENT_ID!
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET!

    if (process.env.PAYPAL_MODE === 'live') {
        return new paypal.core.LiveEnvironment(clientId, clientSecret)
    }
    return new paypal.core.SandboxEnvironment(clientId, clientSecret)
}

export const paypalClient = new paypal.core.PayPalHttpClient(environment())

// Subscription plans configuration
export const SUBSCRIPTION_PLANS = {
    FREE: {
        name: 'Free',
        price: 0,
        messagesLimit: 100,
        contactsLimit: 500,
        sessionsLimit: 1,
        features: [
            '100 messages per month',
            '500 contacts',
            '1 WhatsApp account',
            'Basic analytics',
            'Email support',
        ],
    },
    STARTER: {
        name: 'Starter',
        price: 29,
        paypalPlanId: process.env.PAYPAL_STARTER_PLAN_ID,
        messagesLimit: 5000,
        contactsLimit: 10000,
        sessionsLimit: 3,
        features: [
            '5,000 messages per month',
            '10,000 contacts',
            '3 WhatsApp accounts',
            'Advanced analytics',
            'Message templates',
            'Campaign scheduling',
            'Priority email support',
        ],
    },
    PROFESSIONAL: {
        name: 'Professional',
        price: 79,
        paypalPlanId: process.env.PAYPAL_PROFESSIONAL_PLAN_ID,
        messagesLimit: 25000,
        contactsLimit: 50000,
        sessionsLimit: 10,
        features: [
            '25,000 messages per month',
            '50,000 contacts',
            '10 WhatsApp accounts',
            'Advanced analytics & reports',
            'Unlimited templates',
            'Campaign automation',
            'API access',
            'Priority support',
        ],
    },
    ENTERPRISE: {
        name: 'Enterprise',
        price: 199,
        paypalPlanId: process.env.PAYPAL_ENTERPRISE_PLAN_ID,
        messagesLimit: 100000,
        contactsLimit: 200000,
        sessionsLimit: 50,
        features: [
            '100,000 messages per month',
            '200,000 contacts',
            '50 WhatsApp accounts',
            'Custom analytics & reports',
            'Unlimited templates',
            'Advanced automation',
            'Full API access',
            'Dedicated account manager',
            '24/7 priority support',
        ],
    },
}

export async function createSubscription(planId: string, userId: string) {
    const request = new paypal.subscriptions.SubscriptionsCreateRequest()
    request.requestBody({
        plan_id: planId,
        subscriber: {
            name: {
                given_name: 'User',
                surname: userId,
            },
        },
        application_context: {
            brand_name: 'BulkWaMsg',
            shipping_preference: 'NO_SHIPPING',
            user_action: 'SUBSCRIBE_NOW',
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?cancelled=true`,
        },
    })

    const response = await paypalClient.execute(request)
    return response.result
}

export async function cancelSubscription(subscriptionId: string, reason: string) {
    const request = new paypal.subscriptions.SubscriptionsCancelRequest(subscriptionId)
    request.requestBody({
        reason,
    })

    const response = await paypalClient.execute(request)
    return response.result
}

export async function getSubscriptionDetails(subscriptionId: string) {
    const request = new paypal.subscriptions.SubscriptionsGetRequest(subscriptionId)
    const response = await paypalClient.execute(request)
    return response.result
}
