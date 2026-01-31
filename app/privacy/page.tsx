import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export const metadata: Metadata = {
    title: "Privacy Policy - BulkWaMsg",
    description: "Read BulkWaMsg's privacy policy to understand how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
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
                        <Link href="/auth/login"><Button variant="outline">Login</Button></Link>
                        <Link href="/auth/register"><Button className="gradient-primary">Get Started</Button></Link>
                    </nav>
                </div>
            </header>

            {/* Content */}
            <div className="container mx-auto px-4 py-20 max-w-4xl">
                <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
                <p className="text-muted-foreground mb-8">Last updated: January 31, 2026</p>

                <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-3xl font-bold mb-4">1. Introduction</h2>
                        <p className="text-muted-foreground">
                            BulkWaMsg ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our WhatsApp bulk messaging platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4">2. Information We Collect</h2>
                        <h3 className="text-2xl font-semibold mb-3">2.1 Personal Information</h3>
                        <p className="text-muted-foreground mb-4">We collect information that you provide directly to us, including:</p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                            <li>Name and email address</li>
                            <li>Account credentials</li>
                            <li>Payment information (processed securely through PayPal)</li>
                            <li>Contact lists and message content</li>
                            <li>WhatsApp session data</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 mt-6">2.2 Automatically Collected Information</h3>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                            <li>IP address and device information</li>
                            <li>Browser type and version</li>
                            <li>Usage data and analytics</li>
                            <li>Cookies and similar tracking technologies</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4">3. How We Use Your Information</h2>
                        <p className="text-muted-foreground mb-4">We use the collected information for:</p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                            <li>Providing and maintaining our services</li>
                            <li>Processing your transactions</li>
                            <li>Sending administrative information</li>
                            <li>Improving our platform and user experience</li>
                            <li>Monitoring and analyzing usage patterns</li>
                            <li>Detecting and preventing fraud</li>
                            <li>Complying with legal obligations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4">4. Data Security</h2>
                        <p className="text-muted-foreground">
                            We implement appropriate technical and organizational security measures to protect your personal information, including:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                            <li>Encryption of data in transit and at rest</li>
                            <li>Regular security assessments</li>
                            <li>Access controls and authentication</li>
                            <li>Secure data storage with trusted providers</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4">5. Data Sharing and Disclosure</h2>
                        <p className="text-muted-foreground mb-4">We do not sell your personal information. We may share your data with:</p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                            <li>Service providers who assist in our operations</li>
                            <li>Payment processors (PayPal)</li>
                            <li>Law enforcement when required by law</li>
                            <li>Third parties with your consent</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4">6. Your Rights</h2>
                        <p className="text-muted-foreground mb-4">You have the right to:</p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                            <li>Access your personal information</li>
                            <li>Correct inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Object to data processing</li>
                            <li>Export your data</li>
                            <li>Withdraw consent at any time</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4">7. Cookies</h2>
                        <p className="text-muted-foreground">
                            We use cookies and similar tracking technologies to track activity on our platform and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4">8. Data Retention</h2>
                        <p className="text-muted-foreground">
                            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4">9. Children's Privacy</h2>
                        <p className="text-muted-foreground">
                            Our service is not intended for users under the age of 18. We do not knowingly collect personal information from children under 18.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4">10. Changes to This Policy</h2>
                        <p className="text-muted-foreground">
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4">11. Contact Us</h2>
                        <p className="text-muted-foreground">
                            If you have any questions about this Privacy Policy, please contact us at:
                        </p>
                        <p className="text-muted-foreground mt-4">
                            Email: <a href="mailto:privacy@bulkwamsg.com" className="text-whatsapp hover:underline">privacy@bulkwamsg.com</a>
                        </p>
                    </section>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t bg-white/50 dark:bg-black/50 backdrop-blur-lg mt-20">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="h-6 w-6 text-whatsapp" />
                            <span className="font-bold text-gradient">BulkWaMsg</span>
                        </div>
                        <div className="flex gap-6 text-sm">
                            <Link href="/privacy" className="hover:text-whatsapp transition">Privacy</Link>
                            <Link href="/terms" className="hover:text-whatsapp transition">Terms</Link>
                            <Link href="/contact" className="hover:text-whatsapp transition">Contact</Link>
                        </div>
                        <p className="text-sm text-muted-foreground">© 2026 BulkWaMsg. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
