import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const contactSchema = z.object({
    name: z.string().optional(),
    phoneNumber: z.string().min(10),
    email: z.string().email().optional().or(z.literal("")),
});

export async function GET(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const contacts = await prisma.contact.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ contacts });
    } catch (error) {
        console.error("Error fetching contacts:", error);
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
        const validatedData = contactSchema.parse(body);

        // Check subscription limits
        const subscription = await prisma.subscription.findUnique({
            where: { userId: session.user.id },
        });

        const contactCount = await prisma.contact.count({
            where: { userId: session.user.id },
        });

        if (contactCount >= (subscription?.contactsLimit || 500)) {
            return NextResponse.json(
                { error: "Contact limit reached. Please upgrade your plan." },
                { status: 403 }
            );
        }

        // Check if contact already exists
        const existing = await prisma.contact.findFirst({
            where: {
                userId: session.user.id,
                phoneNumber: validatedData.phoneNumber,
            },
        });

        if (existing) {
            return NextResponse.json(
                { error: "Contact with this phone number already exists" },
                { status: 400 }
            );
        }

        const contact = await prisma.contact.create({
            data: {
                userId: session.user.id,
                name: validatedData.name,
                phoneNumber: validatedData.phoneNumber,
                email: validatedData.email || null,
            },
        });

        return NextResponse.json({ contact }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating contact:", error);

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
