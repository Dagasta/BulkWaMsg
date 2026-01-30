import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { name } = await request.json();

        if (!name) {
            return NextResponse.json({ error: "Session name is required" }, { status: 400 });
        }

        // Check subscription limits
        const subscription = await prisma.subscription.findUnique({
            where: { userId: session.user.id },
        });

        const sessionCount = await prisma.whatsAppSession.count({
            where: { userId: session.user.id },
        });

        if (sessionCount >= (subscription?.sessionsLimit || 1)) {
            return NextResponse.json(
                { error: "Session limit reached. Please upgrade your plan." },
                { status: 403 }
            );
        }

        // Create session in database
        const whatsappSession = await prisma.whatsAppSession.create({
            data: {
                userId: session.user.id,
                name,
                status: "CONNECTING",
            },
        });

        // Initialize WhatsApp client via service
        const serviceUrl = process.env.WHATSAPP_SERVICE_URL || "http://localhost:3001";
        const response = await fetch(`${serviceUrl}/session/init`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-service-secret": process.env.WHATSAPP_SERVICE_SECRET || "",
            },
            body: JSON.stringify({
                sessionId: whatsappSession.id,
                userId: session.user.id,
            }),
        });

        if (!response.ok) {
            await prisma.whatsAppSession.delete({
                where: { id: whatsappSession.id },
            });
            return NextResponse.json(
                { error: "Failed to initialize WhatsApp session" },
                { status: 500 }
            );
        }

        return NextResponse.json({ session: whatsappSession });
    } catch (error) {
        console.error("Error connecting WhatsApp:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
