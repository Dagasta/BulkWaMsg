import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, Target, Award, Zap, Shield, TrendingUp, Globe } from "lucide-react";

export const metadata: Metadata = {
    title: "About Us - BulkWaMsg | Leading WhatsApp Bulk Messaging Platform",
    description: "Learn about BulkWaMsg, the world's most trusted WhatsApp bulk messaging platform. Helping businesses reach millions of customers with advanced automation and analytics.",
    keywords: "about bulkwamsg, whatsapp marketing company, bulk messaging platform, whatsapp automation",
    openGraph: {
        title: "About BulkWaMsg - WhatsApp Marketing Leaders",
        description: "Discover how BulkWaMsg is revolutionizing business communication with WhatsApp bulk messaging.",
        type: "website",
    },
};

export default function AboutPage() {
    const stats = [
        { icon: Users, label: "Active Users", value: "10,000+" },
        { icon: MessageSquare, label: "Messages Sent", value: "50M+" },
        { icon: Globe, label: "Countries", value: "120+" },
        { icon: TrendingUp, label: "Success Rate", value: "99.9%" },
    ];

    const values = [
        {
            icon: Target,
            title: "Mission-Driven",
            description: "Empowering businesses to connect with their customers through efficient, reliable WhatsApp messaging.",
        },
        {
            icon: Shield,
            title: "Security First",
            description: "Your data security is our top priority. We use bank-level encryption and comply with all data protection regulations.",
        },
        {
            icon: Zap,
            title: "Innovation",
            description: "Constantly evolving with cutting-edge features to stay ahead of the market and meet your needs.",
        },
        {
            icon: Award,
            title: "Excellence",
            description: "Committed to delivering the highest quality service with 24/7 support and 99.9% uptime.",
        },
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
                        <Link href="/" className="text-sm font-medium hover:text-whatsapp transition">
                            Home
                        </Link>
                        <Link href="/features" className="text-sm font-medium hover:text-whatsapp transition">
                            Features
                        </Link>
                        <Link href="/pricing" className="text-sm font-medium hover:text-whatsapp transition">
                            Pricing
                        </Link>
                        <Link href="/contact" className="text-sm font-medium hover:text-whatsapp transition">
                            Contact
                        </Link>
                        <Link href="/auth/login">
                            <Button variant="outline">Login</Button>
                        </Link>
                        <Link href="/auth/register">
                            <Button className="gradient-primary">Get Started</Button>
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="gradient-bg dark:gradient-bg-dark py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        About <span className="text-gradient">BulkWaMsg</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        We're on a mission to revolutionize business communication through powerful,
                        easy-to-use WhatsApp bulk messaging solutions.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <Card key={index} className="text-center">
                                <CardContent className="pt-6">
                                    <stat.icon className="h-12 w-12 text-whatsapp mx-auto mb-4" />
                                    <p className="text-4xl font-bold mb-2">{stat.value}</p>
                                    <p className="text-muted-foreground">{stat.label}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold mb-8 text-center">Our Story</h2>
                        <div className="space-y-6 text-lg text-muted-foreground">
                            <p>
                                BulkWaMsg was born from a simple observation: businesses were struggling to reach
                                their customers effectively through traditional channels. Email open rates were declining,
                                SMS was expensive, and social media was oversaturated.
                            </p>
                            <p>
                                Meanwhile, WhatsApp had become the world's most popular messaging platform, with over
                                2 billion active users. We saw an opportunity to help businesses leverage this powerful
                                channel to connect with their customers in a more personal, immediate way.
                            </p>
                            <p>
                                Today, BulkWaMsg serves thousands of businesses worldwide, from small startups to
                                large enterprises. We've sent over 50 million messages, helping our clients increase
                                engagement, boost sales, and build stronger customer relationships.
                            </p>
                            <p>
                                But we're just getting started. Our team is constantly innovating, adding new features,
                                and improving our platform to ensure you have the best WhatsApp marketing tools available.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                                <CardHeader>
                                    <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-whatsapp/10 flex items-center justify-center">
                                        <value.icon className="h-8 w-8 text-whatsapp" />
                                    </div>
                                    <CardTitle>{value.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <Card className="glass-dark text-white p-12 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Ready to Transform Your Business Communication?
                        </h2>
                        <p className="text-xl mb-8 text-gray-300">
                            Join thousands of businesses using BulkWaMsg to reach their customers
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/auth/register">
                                <Button size="lg" className="gradient-primary text-lg px-8 py-6">
                                    Start Free Trial
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white text-black hover:bg-gray-100">
                                    Contact Sales
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
                        <div className="flex gap-6 text-sm">
                            <Link href="/about" className="hover:text-whatsapp transition">About</Link>
                            <Link href="/features" className="hover:text-whatsapp transition">Features</Link>
                            <Link href="/pricing" className="hover:text-whatsapp transition">Pricing</Link>
                            <Link href="/contact" className="hover:text-whatsapp transition">Contact</Link>
                            <Link href="/privacy" className="hover:text-whatsapp transition">Privacy</Link>
                            <Link href="/terms" className="hover:text-whatsapp transition">Terms</Link>
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
