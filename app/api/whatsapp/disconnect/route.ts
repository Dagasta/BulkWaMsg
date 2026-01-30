import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { sessionId } = await request.json();

        if (!sessionId) {
            return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
        }

        // Verify session belongs to user
        const whatsappSession = await prisma.whatsAppSession.findFirst({
            where: {
                id: sessionId,
                userId: session.user.id,
            },
        });

        if (!whatsappSession) {
            return NextResponse.json({ error: "Session not found" }, { status: 404 });
        }

        // Disconnect via service
        const serviceUrl = process.env.WHATSAPP_SERVICE_URL || "http://localhost:3001";
        const response = await fetch(`${serviceUrl}/session/${sessionId}/disconnect`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-service-secret": process.env.WHATSAPP_SERVICE_SECRET || "",
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to disconnect session" },
                { status: 500 }
            );
        }

        // Update database
        await prisma.whatsAppSession.update({
            where: { id: sessionId },
            data: {
                status: "DISCONNECTED",
                qrCode: null,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error disconnecting WhatsApp:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
