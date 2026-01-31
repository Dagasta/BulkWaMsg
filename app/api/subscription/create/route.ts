import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const PAYPAL_API = process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

// Use actual plan IDs from environment variables
const PLAN_IDS = {
    monthly: process.env.PAYPAL_MONTHLY_PLAN_ID || "",
    yearly: process.env.PAYPAL_YEARLY_PLAN_ID || "",
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

    if (!response.ok) {
        const error = await response.text();
        console.error("PayPal auth error:", error);
        throw new Error("Failed to get PayPal access token");
    }

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

        const planId = PLAN_IDS[plan as "monthly" | "yearly"];

        // Validate plan ID exists
        if (!planId) {
            console.error(`Missing PayPal plan ID for ${plan} plan`);
            return NextResponse.json(
                { error: `PayPal plan ID not configured for ${plan} plan` },
                { status: 500 }
            );
        }

        console.log(`Creating ${plan} subscription with plan ID: ${planId}`);

        const accessToken = await getPayPalAccessToken();

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
            console.error("PayPal subscription creation error:", {
                status: subscriptionResponse.status,
                statusText: subscriptionResponse.statusText,
                error: subscriptionData,
            });
            return NextResponse.json(
                {
                    error: "Failed to create subscription",
                    details: subscriptionData.message || "Unknown error"
                },
                { status: 500 }
            );
        }

        // Get approval URL
        const approvalUrl = subscriptionData.links?.find(
            (link: any) => link.rel === "approve"
        )?.href;

        if (!approvalUrl) {
            console.error("No approval URL in PayPal response:", subscriptionData);
            return NextResponse.json(
                { error: "No approval URL received from PayPal" },
                { status: 500 }
            );
        }

        console.log("Subscription created successfully:", {
            subscriptionId: subscriptionData.id,
            approvalUrl,
        });

        return NextResponse.json({
            subscriptionId: subscriptionData.id,
            approvalUrl,
        });
    } catch (error) {
        console.error("Error creating subscription:", error);
        return NextResponse.json(
            { error: "Failed to create subscription", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
