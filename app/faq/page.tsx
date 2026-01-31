import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "FAQ - Frequently Asked Questions | BulkWaMsg",
    description: "Find answers to common questions about BulkWaMsg, WhatsApp bulk messaging, pricing, features, and more.",
};

export default function FAQPage() {
    const faqs = [
        {
            category: "Getting Started",
            questions: [
                {
                    q: "How do I get started with BulkWaMsg?",
                    a: "Simply sign up for a free account, connect your WhatsApp account by scanning a QR code, import your contacts, and start sending messages. The entire process takes less than 5 minutes."
                },
                {
                    q: "Do I need a WhatsApp Business account?",
                    a: "No, you can use BulkWaMsg with both regular WhatsApp and WhatsApp Business accounts. However, we recommend using WhatsApp Business for better features and compliance."
                },
                {
                    q: "Is there a free trial?",
                    a: "Yes! We offer a 14-day free trial with 100 messages and 500 contacts. No credit card required to start."
                }
            ]
        },
        {
            category: "Features & Functionality",
            questions: [
                {
                    q: "Can I connect multiple WhatsApp accounts?",
                    a: "Yes! You can connect and manage multiple WhatsApp accounts from a single dashboard. This is perfect for agencies or businesses with multiple brands."
                },
                {
                    q: "How many messages can I send?",
                    a: "With our paid plans, you can send unlimited messages. However, we implement smart rate limiting to protect your WhatsApp account from being banned."
                },
                {
                    q: "Can I schedule messages?",
                    a: "Absolutely! You can schedule messages for specific dates and times, set up recurring campaigns, and optimize delivery times across different time zones."
                },
                {
                    q: "Does BulkWaMsg support media files?",
                    a: "Yes, you can send images, videos, documents, and other media files along with your messages."
                }
            ]
        },
        {
            category: "Pricing & Billing",
            questions: [
                {
                    q: "What payment methods do you accept?",
                    a: "We accept all major credit cards and PayPal. For annual plans, we also accept bank transfers."
                },
                {
                    q: "Can I cancel my subscription anytime?",
                    a: "Yes, you can cancel your subscription at any time from your account settings. No questions asked, no cancellation fees."
                },
                {
                    q: "Do you offer refunds?",
                    a: "We offer a 14-day money-back guarantee for new subscriptions. If you're not satisfied, we'll refund your payment in full."
                },
                {
                    q: "What happens if I exceed my plan limits?",
                    a: "With our paid plans, there are no message limits. For the free trial, you'll be notified when approaching the limit and can upgrade anytime."
                }
            ]
        },
        {
            category: "Security & Privacy",
            questions: [
                {
                    q: "Is my data secure?",
                    a: "Yes! We use bank-level encryption for all data in transit and at rest. Your WhatsApp sessions are stored securely and never shared with third parties."
                },
                {
                    q: "Do you store my messages?",
                    a: "We only store message metadata (delivery status, timestamps) for analytics. The actual message content is not permanently stored on our servers."
                },
                {
                    q: "Can you access my WhatsApp account?",
                    a: "No, we cannot access your WhatsApp account or read your personal messages. We only facilitate the sending of bulk messages through your connected account."
                },
                {
                    q: "Is BulkWaMsg GDPR compliant?",
                    a: "Yes, we are fully GDPR compliant. You have full control over your data and can request deletion at any time."
                }
            ]
        },
        {
            category: "Technical Support",
            questions: [
                {
                    q: "What if my WhatsApp gets disconnected?",
                    a: "You can easily reconnect by scanning the QR code again. We also send notifications if your account gets disconnected."
                },
                {
                    q: "Will using BulkWaMsg get my WhatsApp banned?",
                    a: "We implement intelligent rate limiting and anti-ban protection to minimize this risk. However, you should always follow WhatsApp's terms of service and avoid sending spam."
                },
                {
                    q: "What kind of support do you offer?",
                    a: "We offer email support for all users, with priority support for paid subscribers. Response time is typically within 24 hours, often much sooner."
                },
                {
                    q: "Do you have an API?",
                    a: "Yes, we offer API access for yearly plan subscribers. This allows you to integrate BulkWaMsg with your existing systems."
                }
            ]
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
                    <HelpCircle className="h-16 w-16 text-whatsapp mx-auto mb-6" />
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Frequently Asked <span className="text-gradient">Questions</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Find answers to common questions about BulkWaMsg
                    </p>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    {faqs.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="mb-12">
                            <h2 className="text-3xl font-bold mb-6">{category.category}</h2>
                            <div className="space-y-4">
                                {category.questions.map((faq, faqIndex) => (
                                    <Card key={faqIndex}>
                                        <CardHeader>
                                            <CardTitle className="text-lg flex items-start gap-2">
                                                <span className="text-whatsapp flex-shrink-0">Q:</span>
                                                <span>{faq.q}</span>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground flex items-start gap-2">
                                                <span className="text-green-500 flex-shrink-0 font-semibold">A:</span>
                                                <span>{faq.a}</span>
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Still Have Questions */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <Card className="glass-dark text-white p-12 text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl font-bold mb-4">Still Have Questions?</h2>
                        <p className="text-xl mb-8 text-gray-300">
                            Can't find the answer you're looking for? Our support team is here to help.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact">
                                <Button size="lg" className="gradient-primary text-lg px-8 py-6">
                                    Contact Support
                                </Button>
                            </Link>
                            <Link href="/help">
                                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white text-black hover:bg-gray-100">
                                    Visit Help Center
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
