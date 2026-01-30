import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Papa from "papaparse";

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const text = await file.text();

        // Parse CSV
        const result = Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
        });

        if (result.errors.length > 0) {
            return NextResponse.json(
                { error: "Invalid CSV format" },
                { status: 400 }
            );
        }

        // Check subscription limits
        const subscription = await prisma.subscription.findUnique({
            where: { userId: session.user.id },
        });

        const currentCount = await prisma.contact.count({
            where: { userId: session.user.id },
        });

        const newContactsCount = result.data.length;
        const totalCount = currentCount + newContactsCount;

        if (totalCount > (subscription?.contactsLimit || 500)) {
            return NextResponse.json(
                {
                    error: `Contact limit exceeded. You can add ${(subscription?.contactsLimit || 500) - currentCount
                        } more contacts.`,
                },
                { status: 403 }
            );
        }

        // Process contacts
        const contacts = result.data.map((row: any) => ({
            userId: session.user.id,
            name: row.name || row.Name || null,
            phoneNumber: row.phone || row.phoneNumber || row.Phone || row.PhoneNumber,
            email: row.email || row.Email || null,
        }));

        // Filter out invalid contacts
        const validContacts = contacts.filter(
            (contact) => contact.phoneNumber && contact.phoneNumber.length >= 10
        );

        if (validContacts.length === 0) {
            return NextResponse.json(
                { error: "No valid contacts found in CSV" },
                { status: 400 }
            );
        }

        // Bulk create contacts (skip duplicates)
        const created = await prisma.$transaction(
            validContacts.map((contact) =>
                prisma.contact.upsert({
                    where: {
                        userId_phoneNumber: {
                            userId: session.user.id,
                            phoneNumber: contact.phoneNumber,
                        },
                    },
                    update: {},
                    create: contact,
                })
            )
        );

        return NextResponse.json({
            count: created.length,
            message: `Successfully imported ${created.length} contacts`,
        });
    } catch (error) {
        console.error("Error importing contacts:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
