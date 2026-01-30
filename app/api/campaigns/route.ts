import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const campaignSchema = z.object({
    name: z.string().min(1),
    message: z.string().min(1),
    sessionId: z.string(),
});

export async function GET(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const campaigns = await prisma.campaign.findMany({
            where: { userId: session.user.id },
            include: {
                session: {
                    select: {
                        name: true,
                        phoneNumber: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ campaigns });
    } catch (error) {
        console.error("Error fetching campaigns:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const validatedData = campaignSchema.parse(body);

        // Verify session belongs to user and is connected
        const whatsappSession = await prisma.whatsAppSession.findFirst({
            where: {
                id: validatedData.sessionId,
                userId: session.user.id,
                status: "CONNECTED",
            },
        });

        if (!whatsappSession) {
            return NextResponse.json(
                { error: "WhatsApp session not found or not connected" },
                { status: 400 }
            );
        }

        // Get all contacts for now (in production, you'd select specific groups)
        const contacts = await prisma.contact.findMany({
            where: { userId: session.user.id },
        });

        if (contacts.length === 0) {
            return NextResponse.json(
                { error: "No contacts found. Please add contacts first." },
                { status: 400 }
            );
        }

        // Create campaign
        const campaign = await prisma.campaign.create({
            data: {
                userId: session.user.id,
                sessionId: validatedData.sessionId,
                name: validatedData.name,
                message: validatedData.message,
                status: "DRAFT",
                totalContacts: contacts.length,
            },
        });

        return NextResponse.json({ campaign }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating campaign:", error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
