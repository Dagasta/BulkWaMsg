import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await context.params;
        const campaignId = id;

        // Get campaign with contacts
        const campaign = await prisma.campaign.findFirst({
            where: {
                id: campaignId,
                userId: session.user.id,
            },
            include: {
                session: true,
            },
        });

        if (!campaign) {
            return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
        }

        if (campaign.status !== "DRAFT") {
            return NextResponse.json(
                { error: "Campaign already sent or in progress" },
                { status: 400 }
            );
        }

        // Check subscription limits
        const subscription = await prisma.subscription.findUnique({
            where: { userId: session.user.id },
        });

        if (!subscription) {
            return NextResponse.json({ error: "No subscription found" }, { status: 400 });
        }

        // Get all contacts
        const contacts = await prisma.contact.findMany({
            where: { userId: session.user.id },
        });

        const messagesNeeded = contacts.length;
        const messagesAvailable =
            (subscription.messagesLimit || 0) - (subscription.messagesUsed || 0);

        if (messagesNeeded > messagesAvailable) {
            return NextResponse.json(
                {
                    error: `Insufficient message credits. You need ${messagesNeeded} but have ${messagesAvailable} available.`,
                },
                { status: 403 }
            );
        }

        // Create message records
        const messages = await prisma.message.createMany({
            data: contacts.map((contact) => ({
                campaignId: campaign.id,
                sessionId: campaign.sessionId,
                contactId: contact.id,
                phoneNumber: contact.phoneNumber,
                message: campaign.message,
                status: "PENDING",
            })),
        });

        // Update campaign status
        await prisma.campaign.update({
            where: { id: campaignId },
            data: {
                status: "RUNNING",
                startedAt: new Date(),
            },
        });

        // Update subscription usage
        await prisma.subscription.update({
            where: { userId: session.user.id },
            data: {
                messagesUsed: {
                    increment: contacts.length,
                },
            },
        });

        // Queue messages for sending via WhatsApp service
        const serviceUrl = process.env.WHATSAPP_SERVICE_URL || "http://localhost:3001";

        const messageRecords = await prisma.message.findMany({
            where: { campaignId: campaign.id },
        });

        for (const msg of messageRecords) {
            await fetch(`${serviceUrl}/message/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-service-secret": process.env.WHATSAPP_SERVICE_SECRET || "",
                },
                body: JSON.stringify({
                    sessionId: campaign.sessionId,
                    phoneNumber: msg.phoneNumber,
                    message: msg.message,
                    messageId: msg.id,
                }),
            });
        }

        return NextResponse.json({
            success: true,
            message: `Campaign started. Sending ${contacts.length} messages.`,
        });
    } catch (error) {
        console.error("Error sending campaign:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
