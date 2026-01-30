import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        // Verify request is from WhatsApp service
        const secret = request.headers.get("x-service-secret");

        if (secret !== process.env.WHATSAPP_SERVICE_SECRET) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { messageId, status, error } = await request.json();

        // Update message status
        const updateData: any = {
            status,
        };

        if (status === "SENT") {
            updateData.sentAt = new Date();
        } else if (status === "DELIVERED") {
            updateData.deliveredAt = new Date();
        } else if (status === "READ") {
            updateData.readAt = new Date();
        } else if (status === "FAILED") {
            updateData.error = error;
        }

        await prisma.message.update({
            where: { id: messageId },
            data: updateData,
        });

        // Update campaign stats
        const message = await prisma.message.findUnique({
            where: { id: messageId },
            include: { campaign: true },
        });

        if (message) {
            const campaign = message.campaign;

            if (status === "SENT") {
                await prisma.campaign.update({
                    where: { id: campaign.id },
                    data: { sentCount: { increment: 1 } },
                });
            } else if (status === "DELIVERED") {
                await prisma.campaign.update({
                    where: { id: campaign.id },
                    data: { deliveredCount: { increment: 1 } },
                });
            } else if (status === "FAILED") {
                await prisma.campaign.update({
                    where: { id: campaign.id },
                    data: { failedCount: { increment: 1 } },
                });
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Message webhook error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
