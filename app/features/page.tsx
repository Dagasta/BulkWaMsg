import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, BarChart3, Zap, Shield, Clock, QrCode, Send, Globe, Smartphone } from "lucide-react";

export const metadata: Metadata = {
    title: "Features - BulkWaMsg | WhatsApp Bulk Messaging Platform",
    description: "Explore BulkWaMsg's powerful features: multi-account support, contact management, campaign automation, analytics, and more. Everything you need for WhatsApp marketing.",
    keywords: "whatsapp features, bulk messaging features, whatsapp automation, contact management, campaign analytics",
};

export default function FeaturesPage() {
    const features = [
        {
            icon: MessageSquare,
            title: "Multi-Account Support",
            description: "Connect and manage multiple WhatsApp accounts from a single dashboard. Switch between accounts seamlessly and organize your messaging campaigns efficiently.",
            benefits: ["Unlimited account connections", "Easy account switching", "Centralized management", "Individual account analytics"]
        },
        {
            icon: Users,
            title: "Advanced Contact Management",
            description: "Import, organize, and segment your contacts with powerful management tools. Create custom groups and tags for targeted messaging.",
            benefits: ["CSV import/export", "Custom contact fields", "Smart segmentation", "Duplicate detection"]
        },
        {
            icon: Send,
            title: "Campaign Automation",
            description: "Create, schedule, and automate your WhatsApp campaigns. Send bulk messages with personalized content and smart delivery timing.",
            benefits: ["Message scheduling", "Template variables", "Automated follow-ups", "Drip campaigns"]
        },
        {
            icon: BarChart3,
            title: "Real-Time Analytics",
            description: "Track message delivery, read rates, and campaign performance with comprehensive analytics and reporting tools.",
            benefits: ["Delivery tracking", "Read receipts", "Campaign reports", "Export analytics"]
        },
        {
            icon: Shield,
            title: "Anti-Ban Protection",
            description: "Intelligent rate limiting and message throttling to keep your WhatsApp accounts safe from bans and restrictions.",
            benefits: ["Smart rate limiting", "Account health monitoring", "Safe sending patterns", "Ban prevention alerts"]
        },
        {
            icon: Clock,
            title: "Message Scheduling",
            description: "Schedule messages for optimal delivery times across different time zones. Set up recurring campaigns and automated reminders.",
            benefits: ["Timezone support", "Recurring schedules", "Queue management", "Delivery optimization"]
        },
        {
            icon: QrCode,
            title: "Easy QR Connection",
            description: "Connect your WhatsApp accounts quickly and securely using QR code scanning. No API keys or complex setup required.",
            benefits: ["Instant connection", "Secure authentication", "Session persistence", "Multi-device support"]
        },
        {
            icon: Globe,
            title: "International Support",
            description: "Send messages to contacts worldwide with support for multiple languages and international phone number formats.",
            benefits: ["Global reach", "Multi-language support", "International numbers", "Currency support"]
        },
        {
            icon: Smartphone,
            title: "Mobile Responsive",
            description: "Access your dashboard and manage campaigns from any device. Fully responsive design for desktop, tablet, and mobile.",
            benefits: ["Mobile-first design", "Touch-optimized", "Offline capabilities", "Progressive Web App"]
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="border-b bg-white/50 dark:bg-black/50 backdrop-blur-lg sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <MessageSquare className="h-8 w-8 text-whatsapp" />
                        <span className="text-2xl font-bold text-gradient">BulkWaMsg</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-sm font-medium hover:text-whatsapp transition">Home</Link>
                        <Link href="/about" className="text-sm font-medium hover:text-whatsapp transition">About</Link>
                        <Link href="/pricing" className="text-sm font-medium hover:text-whatsapp transition">Pricing</Link>
                        <Link href="/contact" className="text-sm font-medium hover:text-whatsapp transition">Contact</Link>
                        <Link href="/auth/login"><Button variant="outline">Login</Button></Link>
                        <Link href="/auth/register"><Button className="gradient-primary">Get Started</Button></Link>
                    </nav>
                </div>
            </header>

            {/* Hero */}
            <section className="gradient-bg dark:gradient-bg-dark py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Powerful <span className="text-gradient">Features</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        Everything you need to run successful WhatsApp marketing campaigns
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="hover:shadow-lg transition-all duration-300">
                                <CardHeader>
                                    <div className="h-16 w-16 rounded-full bg-whatsapp/10 flex items-center justify-center mb-4">
                                        <feature.icon className="h-8 w-8 text-whatsapp" />
                                    </div>
                                    <CardTitle>{feature.title}</CardTitle>
                                    <CardDescription>{feature.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {feature.benefits.map((benefit, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm">
                                                <span className="text-whatsapp">✓</span>
                                                <span>{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <Card className="glass-dark text-white p-12 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Ready to Experience These Features?
                        </h2>
                        <p className="text-xl mb-8 text-gray-300">
                            Start your free 14-day trial today. No credit card required.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/auth/register">
                                <Button size="lg" className="gradient-primary text-lg px-8 py-6">
                                    Start Free Trial
                                </Button>
                            </Link>
                            <Link href="/pricing">
                                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white text-black hover:bg-gray-100">
                                    View Pricing
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t bg-white/50 dark:bg-black/50 backdrop-blur-lg mt-20">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="h-6 w-6 text-whatsapp" />
                            <span className="font-bold text-gradient">BulkWaMsg</span>
                        </div>
                        <p className="text-sm text-muted-foreground">© 2026 BulkWaMsg. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
