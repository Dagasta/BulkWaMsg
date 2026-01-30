import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const PAYPAL_API = process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

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

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const subscriptionId = searchParams.get("subscription_id");
        const token = searchParams.get("token");

        if (!subscriptionId) {
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/whatsapp?error=missing_subscription_id`
            );
        }

        // Get subscription details from PayPal
        const accessToken = await getPayPalAccessToken();
        const response = await fetch(
            `${PAYPAL_API}/v1/billing/subscriptions/${subscriptionId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const subscriptionData = await response.json();

        if (!response.ok || subscriptionData.status !== "ACTIVE") {
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/whatsapp?error=subscription_not_active`
            );
        }

        // Get user ID from custom_id
        const userId = subscriptionData.custom_id;

        if (!userId) {
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/whatsapp?error=invalid_user`
            );
        }

        // Determine plan type
        const planId = subscriptionData.plan_id;
        const isYearly = planId.includes("YEARLY");
        const plan = isYearly ? "ENTERPRISE" : "PROFESSIONAL"; // Map to your plan types

        // Calculate end date
        const startDate = new Date();
        const endDate = new Date(startDate);
        if (isYearly) {
            endDate.setFullYear(endDate.getFullYear() + 1);
        } else {
            endDate.setMonth(endDate.getMonth() + 1);
        }

        // Create or update subscription in database
        await prisma.subscription.upsert({
            where: { userId },
            create: {
                userId,
                plan,
                status: "ACTIVE",
                paypalSubscriptionId: subscriptionId,
                startDate,
                endDate,
            },
            update: {
                plan,
                status: "ACTIVE",
                paypalSubscriptionId: subscriptionId,
                startDate,
                endDate,
            },
        });

        // Redirect to WhatsApp page with success
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/whatsapp?success=true`
        );
    } catch (error) {
        console.error("Error processing subscription success:", error);
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/whatsapp?error=processing_failed`
        );
    }
}
