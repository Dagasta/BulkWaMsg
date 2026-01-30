import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3004"),
    title: {
        default: "BulkWaMsg - WhatsApp Bulk Messaging Platform | Send Unlimited Messages",
        template: "%s | BulkWaMsg",
    },
    description:
        "Send unlimited WhatsApp bulk messages with BulkWaMsg. Connect multiple WhatsApp accounts, manage contacts, schedule campaigns, and track analytics. No Meta subscription required. Start free trial today!",
    keywords: [
        "WhatsApp bulk messaging",
        "WhatsApp marketing",
        "bulk WhatsApp sender",
        "WhatsApp automation",
        "WhatsApp business",
        "mass WhatsApp messages",
        "WhatsApp campaign",
        "WhatsApp API",
        "WhatsApp Web automation",
        "bulk messaging software",
        "WhatsApp CRM",
        "WhatsApp broadcast",
        "WhatsApp scheduler",
        "multi-account WhatsApp",
        "WhatsApp analytics",
    ],
    authors: [{ name: "BulkWaMsg" }],
    creator: "BulkWaMsg",
    publisher: "BulkWaMsg",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3004",
        title: "BulkWaMsg - WhatsApp Bulk Messaging Platform",
        description:
            "Send unlimited WhatsApp bulk messages. Connect multiple accounts, manage contacts, schedule campaigns. No Meta subscription required. Start free!",
        siteName: "BulkWaMsg",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "BulkWaMsg - WhatsApp Bulk Messaging Platform",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "BulkWaMsg - WhatsApp Bulk Messaging Platform",
        description:
            "Send unlimited WhatsApp bulk messages. Connect multiple accounts, manage contacts, schedule campaigns. Start free!",
        images: ["/og-image.png"],
        creator: "@bulkwamsg",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: "your-google-verification-code",
        yandex: "your-yandex-verification-code",
        bing: "your-bing-verification-code",
    },
    alternates: {
        canonical: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3004",
    },
    category: "technology",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#25D366" />

                {/* Structured Data for SEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "SoftwareApplication",
                            name: "BulkWaMsg",
                            applicationCategory: "BusinessApplication",
                            operatingSystem: "Web",
                            offers: {
                                "@type": "Offer",
                                price: "10.00",
                                priceCurrency: "USD",
                                priceValidUntil: "2026-12-31",
                            },
                            aggregateRating: {
                                "@type": "AggregateRating",
                                ratingValue: "4.8",
                                ratingCount: "1250",
                            },
                            description:
                                "Send unlimited WhatsApp bulk messages with BulkWaMsg. Connect multiple WhatsApp accounts, manage contacts, schedule campaigns, and track analytics.",
                        }),
                    }}
                />
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
