import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        // Verify request is from WhatsApp service
        const secret = request.headers.get("x-service-secret");

        if (secret !== process.env.WHATSAPP_SERVICE_SECRET) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { sessionId, event, data } = await request.json();

        // Update session based on event
        switch (event) {
            case "qr_ready":
                await prisma.whatsAppSession.update({
                    where: { id: sessionId },
                    data: {
                        status: "QR_READY",
                        qrCode: data.qrCode,
                    },
                });
                break;

            case "connected":
                await prisma.whatsAppSession.update({
                    where: { id: sessionId },
                    data: {
                        status: "CONNECTED",
                        phoneNumber: data.phoneNumber,
                        qrCode: null,
                        lastSeen: new Date(),
                    },
                });
                break;

            case "disconnected":
                await prisma.whatsAppSession.update({
                    where: { id: sessionId },
                    data: {
                        status: "DISCONNECTED",
                        qrCode: null,
                    },
                });
                break;

            case "auth_failed":
                await prisma.whatsAppSession.update({
                    where: { id: sessionId },
                    data: {
                        status: "FAILED",
                        qrCode: null,
                    },
                });
                break;
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
