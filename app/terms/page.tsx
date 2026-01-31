import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export const metadata: Metadata = {
    title: "Terms of Service - BulkWaMsg",
    description: "Read BulkWaMsg's terms of service to understand the rules and regulations for using our platform.",
};

export default function TermsPage() {
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
                <h1 className="text-5xl font-bold mb-6">Terms of Service</h1>
                <p className="text-muted-foreground mb-8">Last updated: January 31, 2026</p>

                <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-3xl font-bold mb-4">1. Acceptance of Terms</h2>
                        <p className="text-muted-foreground">
                            By accessing and using BulkWaMsg ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4">2. Description of Service</h2>
                        <p className="text-muted-foreground">
                            BulkWaMsg provides a WhatsApp bulk messaging platform that allows users to send messages to multiple contacts, manage campaigns, and analyze messaging performance. The Service is provided "as is" and we reserve the right to modify or discontinue the Service at any time.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4">3. User Accounts</h2>
                        <h3 className="text-2xl font-semibold mb-3">3.1 Account Creation</h3>
                        <p className="text-muted-foreground mb-4">
                            You must create an account to use the Service. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
                        </p>

                        <h3 className="text-2xl font-semibold mb-3">3.2 Account Security</h3>
                        <p className="text-muted-foreground">
                            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4">4. Acceptable Use Policy</h2>
                        <p className="text-muted-foreground mb-4">You agree NOT to use the Service to:</p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                            <li>Send spam or unsolicited messages</li>
                            <li>Violate any laws or regulations</li>
                            <li>Infringe on intellectual property rights</li>
                            <li>Transmit malware or harmful code</li>
                            <li>Harass, abuse, or harm others</li>
                            <li>Impersonate any person or entity</li>
                            <li>Interfere with the Service's operation</li>
                            <li>Violate WhatsApp's Terms of Service</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4">5. WhatsApp Compliance</h2>
                        <p className="text-muted-foreground">
                            You acknowledge that BulkWaMsg is not affiliated with, endorsed by, or sponsored by WhatsApp or Meta. You agree to comply with WhatsApp's Terms of Service and Business Policy. We are not responsible for any actions taken by WhatsApp against your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4">6. Subscription and Payment</h2>
                        <h3 className="text-2xl font-semibold mb-3">6.1 Subscription Plans</h3>
                        <p className="text-muted-foreground mb-4">
                            We offer monthly and yearly subscription plans. All fees are in USD and are non-refundable except as required by law or as explicitly stated in our refund policy.
                        </p>

                        <h3 className="text-2xl font-semibold mb-3">6.2 Automatic Renewal</h3>
                        <p className="text-muted-foreground mb-4">
                            Subscriptions automatically renew unless cancelled before the renewal date. You can cancel your subscription at any time from your account settings.
                        </p>

                        <h3 className="text-2xl font-semibold mb-3">6.3 Refund Policy</h3>
                        <p className="text-muted-foreground">
                            We offer a 14-day money-back guarantee for new subscriptions. Refund requests must be submitted within 14 days of the initial purchase.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4">7. Intellectual Property</h2>
                        <p className="text-muted-foreground">
                            The Service and its original content, features, and functionality are owned by BulkWaMsg and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4">8. User Content</h2>
                        <p className="text-muted-foreground">
                            You retain all rights to the content you upload to the Service. By uploading content, you grant us a license to use, store, and process that content solely for the purpose of providing the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4">9. Termination</h2>
                        <p className="text-muted-foreground">
                            We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use the Service will immediately cease.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4">10. Limitation of Liability</h2>
                        <p className="text-muted-foreground">
                            To the maximum extent permitted by law, BulkWaMsg shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4">11. Disclaimer of Warranties</h2>
                        <p className="text-muted-foreground">
                            The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4">12. Changes to Terms</h2>
                        <p className="text-muted-foreground">
                            We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the "Last updated" date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4">13. Governing Law</h2>
                        <p className="text-muted-foreground">
                            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which BulkWaMsg operates, without regard to its conflict of law provisions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-4">14. Contact Information</h2>
                        <p className="text-muted-foreground">
                            If you have any questions about these Terms, please contact us at:
                        </p>
                        <p className="text-muted-foreground mt-4">
                            Email: <a href="mailto:legal@bulkwamsg.com" className="text-whatsapp hover:underline">legal@bulkwamsg.com</a>
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
