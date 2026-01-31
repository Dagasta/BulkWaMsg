import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Check, Zap } from "lucide-react";

export const metadata: Metadata = {
    title: "Pricing - BulkWaMsg | Simple & Transparent Pricing",
    description: "Choose the perfect plan for your WhatsApp bulk messaging needs. Start with a 14-day free trial. No credit card required.",
    keywords: "whatsapp pricing, bulk messaging cost, whatsapp marketing price, subscription plans",
};

export default function PricingPage() {
    const plans = [
        {
            name: "Free Trial",
            price: "$0",
            period: "14 days",
            description: "Perfect for testing our platform",
            features: [
                "100 messages per month",
                "500 contacts",
                "1 WhatsApp account",
                "Basic analytics",
                "Email support",
                "All core features"
            ],
            cta: "Start Free Trial",
            popular: false
        },
        {
            name: "Monthly Plan",
            price: "$10",
            period: "per month",
            description: "Perfect for getting started",
            features: [
                "Unlimited messages",
                "Unlimited contacts",
                "Multiple WhatsApp accounts",
                "Advanced analytics",
                "Campaign scheduling",
                "Anti-ban protection",
                "Priority email support",
                "Message templates",
                "Contact segmentation"
            ],
            cta: "Get Started",
            popular: true
        },
        {
            name: "Yearly Plan",
            price: "$120",
            period: "per year",
            description: "Best value - Save 17%",
            savings: "Only $10/month",
            features: [
                "Everything in Monthly Plan",
                "Priority support",
                "Early access to new features",
                "Dedicated account manager",
                "Custom integrations",
                "Advanced API access",
                "White-label options",
                "Custom training session",
                "SLA guarantee"
            ],
            cta: "Get Started",
            popular: false
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
                        <Link href="/features" className="text-sm font-medium hover:text-whatsapp transition">Features</Link>
                        <Link href="/about" className="text-sm font-medium hover:text-whatsapp transition">About</Link>
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
                        Simple, <span className="text-gradient">Transparent Pricing</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        Choose the plan that fits your needs. Start with a free trial, upgrade anytime.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan, index) => (
                            <Card key={index} className={`relative ${plan.popular ? 'glass border-whatsapp shadow-xl scale-105' : 'glass'}`}>
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-whatsapp text-white px-4 py-1 rounded-full text-sm font-medium">
                                        Most Popular
                                    </div>
                                )}
                                <CardHeader className="text-center">
                                    <CardTitle className="text-3xl">{plan.name}</CardTitle>
                                    <CardDescription>{plan.description}</CardDescription>
                                    <div className="mt-6">
                                        <span className="text-6xl font-bold">{plan.price}</span>
                                        <span className="text-muted-foreground">/{plan.period}</span>
                                    </div>
                                    {plan.savings && (
                                        <p className="text-green-500 font-medium mt-2">{plan.savings}</p>
                                    )}
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3 mb-6">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-whatsapp' : 'text-green-500'}`} />
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href="/auth/register" className="block">
                                        <Button className={`w-full ${plan.popular ? 'gradient-primary' : ''}`}>
                                            {plan.cta}
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                        <p className="text-muted-foreground">Common questions about our pricing</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {[
                            {
                                q: "Can I cancel anytime?",
                                a: "Yes! You can cancel your subscription at any time. No questions asked, no cancellation fees."
                            },
                            {
                                q: "Do you offer refunds?",
                                a: "We offer a 14-day money-back guarantee. If you're not satisfied, we'll refund your payment."
                            },
                            {
                                q: "What payment methods do you accept?",
                                a: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
                            },
                            {
                                q: "Can I upgrade or downgrade my plan?",
                                a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
                            }
                        ].map((faq, i) => (
                            <Card key={i}>
                                <CardHeader>
                                    <CardTitle className="text-lg">{faq.q}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{faq.a}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <Card className="glass-dark text-white p-12 text-center">
                        <Zap className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl mb-8 text-gray-300">
                            Start your free 14-day trial today. No credit card required.
                        </p>
                        <Link href="/auth/register">
                            <Button size="lg" className="gradient-primary text-lg px-8 py-6">
                                Start Free Trial
                            </Button>
                        </Link>
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
