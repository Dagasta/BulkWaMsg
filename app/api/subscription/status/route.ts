import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ hasActiveSubscription: false });
        }

        const subscription = await prisma.subscription.findFirst({
            where: {
                userId: session.user.id,
                status: "ACTIVE",
                currentPeriodEnd: {
                    gte: new Date(),
                },
            },
        });

        return NextResponse.json({
            hasActiveSubscription: !!subscription,
            subscription: subscription
                ? {
                    plan: subscription.plan,
                    status: subscription.status,
                    currentPeriodEnd: subscription.currentPeriodEnd,
                }
                : null,
        });
    } catch (error) {
        console.error("Error checking subscription:", error);
        return NextResponse.json(
            { error: "Failed to check subscription" },
            { status: 500 }
        );
    }
}
