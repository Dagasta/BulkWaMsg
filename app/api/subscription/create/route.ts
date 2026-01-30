import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const PAYPAL_API = process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

const PLAN_IDS = {
    monthly: "P-MONTHLY-10USD",  // You'll create these in PayPal dashboard
    yearly: "P-YEARLY-120USD",
};

async function getPayPalAccessToken() {
    const auth = Buffer.from(
        `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString("base64");

    const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
    });

    const data = await response.json();
    return data.access_token;
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { plan } = await req.json();

        if (!plan || !["monthly", "yearly"].includes(plan)) {
            return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
        }

        const accessToken = await getPayPalAccessToken();
        const planId = PLAN_IDS[plan as "monthly" | "yearly"];

        // Create subscription
        const subscriptionResponse = await fetch(`${PAYPAL_API}/v1/billing/subscriptions`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                plan_id: planId,
                application_context: {
                    brand_name: "BulkWaMsg",
                    locale: "en-US",
                    shipping_preference: "NO_SHIPPING",
                    user_action: "SUBSCRIBE_NOW",
                    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/subscription/success`,
                    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/whatsapp`,
                },
                custom_id: session.user.id,
            }),
        });

        const subscriptionData = await subscriptionResponse.json();

        if (!subscriptionResponse.ok) {
            console.error("PayPal error:", subscriptionData);
            return NextResponse.json(
                { error: "Failed to create subscription" },
                { status: 500 }
            );
        }

        // Get approval URL
        const approvalUrl = subscriptionData.links.find(
            (link: any) => link.rel === "approve"
        )?.href;

        return NextResponse.json({
            subscriptionId: subscriptionData.id,
            approvalUrl,
        });
    } catch (error) {
        console.error("Error creating subscription:", error);
        return NextResponse.json(
            { error: "Failed to create subscription" },
            { status: 500 }
        );
    }
}
