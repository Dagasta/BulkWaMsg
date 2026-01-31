import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Mail, Phone, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
    title: "Contact Us - BulkWaMsg | Get in Touch with Our Team",
    description: "Have questions about BulkWaMsg? Contact our support team for help with WhatsApp bulk messaging, pricing, or technical support. We're here to help!",
    keywords: "contact bulkwamsg, whatsapp support, bulk messaging help, customer service",
};

export default function ContactPage() {
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
                        <Link href="/features" className="text-sm font-medium hover:text-whatsapp transition">Features</Link>
                        <Link href="/pricing" className="text-sm font-medium hover:text-whatsapp transition">Pricing</Link>
                        <Link href="/auth/login"><Button variant="outline">Login</Button></Link>
                        <Link href="/auth/register"><Button className="gradient-primary">Get Started</Button></Link>
                    </nav>
                </div>
            </header>

            {/* Hero */}
            <section className="gradient-bg dark:gradient-bg-dark py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Get in <span className="text-gradient">Touch</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Send us a Message</CardTitle>
                                <CardDescription>Fill out the form below and we'll get back to you within 24 hours</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input id="name" placeholder="John Doe" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="you@example.com" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input id="subject" placeholder="How can we help?" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea id="message" placeholder="Tell us more about your inquiry..." rows={6} required />
                                    </div>
                                    <Button type="submit" className="w-full gradient-primary">
                                        <Send className="h-4 w-4 mr-2" />
                                        Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                                <p className="text-muted-foreground mb-8">
                                    Choose the best way to reach us. We're available 24/7 to assist you.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <Card className="hover:shadow-lg transition-all duration-300">
                                    <CardContent className="flex items-start gap-4 pt-6">
                                        <div className="h-12 w-12 rounded-full bg-whatsapp/10 flex items-center justify-center flex-shrink-0">
                                            <Mail className="h-6 w-6 text-whatsapp" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Email</h3>
                                            <p className="text-muted-foreground text-sm mb-2">Our team is here to help</p>
                                            <a href="mailto:support@bulkwamsg.com" className="text-whatsapp hover:underline">
                                                support@bulkwamsg.com
                                            </a>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="hover:shadow-lg transition-all duration-300">
                                    <CardContent className="flex items-start gap-4 pt-6">
                                        <div className="h-12 w-12 rounded-full bg-whatsapp/10 flex items-center justify-center flex-shrink-0">
                                            <Phone className="h-6 w-6 text-whatsapp" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Phone</h3>
                                            <p className="text-muted-foreground text-sm mb-2">Mon-Fri from 8am to 6pm</p>
                                            <a href="tel:+1234567890" className="text-whatsapp hover:underline">
                                                +1 (234) 567-890
                                            </a>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="hover:shadow-lg transition-all duration-300">
                                    <CardContent className="flex items-start gap-4 pt-6">
                                        <div className="h-12 w-12 rounded-full bg-whatsapp/10 flex items-center justify-center flex-shrink-0">
                                            <MapPin className="h-6 w-6 text-whatsapp" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Office</h3>
                                            <p className="text-muted-foreground text-sm mb-2">Visit our headquarters</p>
                                            <p className="text-sm">
                                                123 Business Street<br />
                                                San Francisco, CA 94102<br />
                                                United States
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card className="glass-dark text-white p-6">
                                <h3 className="text-xl font-bold mb-2">Need Immediate Help?</h3>
                                <p className="text-gray-300 mb-4">
                                    Check out our Help Center for instant answers to common questions.
                                </p>
                                <Link href="/help">
                                    <Button variant="outline" className="bg-white text-black hover:bg-gray-100">
                                        Visit Help Center
                                    </Button>
                                </Link>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Preview */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                        <p className="text-muted-foreground">Quick answers to common questions</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">How quickly will I get a response?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">We typically respond within 24 hours during business days, often much sooner.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Do you offer phone support?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Yes! Phone support is available for all paid plan customers during business hours.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Can I schedule a demo?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Absolutely! Contact us to schedule a personalized demo of our platform.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">What about technical support?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Our technical team is available 24/7 to help with any integration or technical issues.</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="text-center mt-8">
                        <Link href="/faq">
                            <Button variant="outline" size="lg">View All FAQs</Button>
                        </Link>
                    </div>
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
                        <p className="text-sm text-muted-foreground">© 2026 BulkWaMsg. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
