import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, BarChart3, Zap, Shield, Clock, Check, QrCode } from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen gradient-bg dark:gradient-bg-dark">
            {/* Header */}
            <header className="border-b bg-white/50 dark:bg-black/50 backdrop-blur-lg sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <MessageSquare className="h-8 w-8 text-whatsapp" />
                        <span className="text-2xl font-bold text-gradient">BulkWaMsg</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="#features" className="text-sm font-medium hover:text-whatsapp transition">
                            Features
                        </Link>
                        <Link href="#pricing" className="text-sm font-medium hover:text-whatsapp transition">
                            Pricing
                        </Link>
                        <Link href="/auth/login" className="text-sm font-medium hover:text-whatsapp transition">
                            Login
                        </Link>
                        <Link href="/auth/register">
                            <Button className="gradient-primary">Get Started</Button>
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 md:py-32">
                <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                        Send Bulk WhatsApp Messages{" "}
                        <span className="text-gradient">Effortlessly</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                        Connect multiple WhatsApp accounts, manage contacts, and send bulk messages with advanced analytics and automation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/auth/register">
                            <Button size="lg" className="gradient-primary text-lg px-8 py-6">
                                <QrCode className="mr-2 h-5 w-5" />
                                Start Free Trial
                            </Button>
                        </Link>
                        <Link href="#features">
                            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                                Learn More
                            </Button>
                        </Link>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        ✨ No credit card required • 14-day free trial
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="container mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Powerful Features
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Everything you need to manage WhatsApp bulk messaging
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            icon: MessageSquare,
                            title: "Multi-Account Support",
                            description: "Connect multiple WhatsApp accounts and manage them from one dashboard.",
                        },
                        {
                            icon: Users,
                            title: "Contact Management",
                            description: "Import, organize, and segment your contacts with custom groups.",
                        },
                        {
                            icon: BarChart3,
                            title: "Advanced Analytics",
                            description: "Track message delivery, read rates, and campaign performance in real-time.",
                        },
                        {
                            icon: Zap,
                            title: "Campaign Automation",
                            description: "Schedule campaigns and automate message sending with smart queuing.",
                        },
                        {
                            icon: Shield,
                            title: "Anti-Ban Protection",
                            description: "Intelligent rate limiting to keep your WhatsApp accounts safe.",
                        },
                        {
                            icon: Clock,
                            title: "Message Scheduling",
                            description: "Schedule messages for optimal delivery times across time zones.",
                        },
                    ].map((feature, index) => (
                        <Card key={index} className="glass hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <CardHeader>
                                <feature.icon className="h-12 w-12 text-whatsapp mb-4" />
                                <CardTitle>{feature.title}</CardTitle>
                                <CardDescription>{feature.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="container mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Choose the plan that fits your needs
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <Card className="glass border-whatsapp shadow-xl scale-105">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl">Monthly Plan</CardTitle>
                            <CardDescription>Perfect for getting started</CardDescription>
                            <div className="mt-6">
                                <span className="text-6xl font-bold">$10</span>
                                <span className="text-muted-foreground">/month</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {[
                                    "Unlimited messages",
                                    "Unlimited contacts",
                                    "Multiple WhatsApp accounts",
                                    "Advanced analytics",
                                    "Campaign scheduling",
                                    "Anti-ban protection",
                                    "24/7 support",
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-whatsapp flex-shrink-0 mt-0.5" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/auth/register" className="block mt-6">
                                <Button className="w-full gradient-primary">
                                    Get Started
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="glass">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                            Save 17%
                        </div>
                        <CardHeader className="text-center pt-8">
                            <CardTitle className="text-3xl">Yearly Plan</CardTitle>
                            <CardDescription>Best value for serious users</CardDescription>
                            <div className="mt-6">
                                <span className="text-6xl font-bold">$120</span>
                                <span className="text-muted-foreground">/year</span>
                            </div>
                            <p className="text-green-400 font-medium mt-2">Only $10/month</p>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {[
                                    "Everything in Monthly Plan",
                                    "Priority support",
                                    "Early access to new features",
                                    "Dedicated account manager",
                                    "Custom integrations",
                                    "Advanced API access",
                                    "White-label options",
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/auth/register" className="block mt-6">
                                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                                    Get Started
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-20">
                <Card className="glass-dark text-white p-12 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl mb-8 text-gray-300">
                        Join thousands of businesses using BulkWaMsg to reach their customers
                    </p>
                    <Link href="/auth/register">
                        <Button size="lg" className="gradient-primary text-lg px-8 py-6">
                            Start Your Free Trial
                        </Button>
                    </Link>
                </Card>
            </section>

            {/* Footer */}
            <footer className="border-t bg-white/50 dark:bg-black/50 backdrop-blur-lg mt-20">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="h-6 w-6 text-whatsapp" />
                            <span className="font-bold text-gradient">BulkWaMsg</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            © 2026 BulkWaMsg. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
