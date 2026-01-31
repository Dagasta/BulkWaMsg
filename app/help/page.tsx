import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Book, Video, FileText, Mail, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Help Center - BulkWaMsg | Guides & Documentation",
    description: "Access BulkWaMsg's help center for guides, tutorials, documentation, and support resources.",
};

export default function HelpPage() {
    const helpCategories = [
        {
            icon: Book,
            title: "Getting Started Guide",
            description: "Learn the basics of BulkWaMsg and get your first campaign running in minutes.",
            link: "#getting-started"
        },
        {
            icon: Video,
            title: "Video Tutorials",
            description: "Watch step-by-step video guides on using all features of the platform.",
            link: "#tutorials"
        },
        {
            icon: FileText,
            title: "Documentation",
            description: "Comprehensive documentation covering all features and API references.",
            link: "#documentation"
        },
        {
            icon: HelpCircle,
            title: "FAQ",
            description: "Find quick answers to the most commonly asked questions.",
            link: "/faq"
        },
        {
            icon: Mail,
            title: "Contact Support",
            description: "Can't find what you're looking for? Our support team is here to help.",
            link: "/contact"
        }
    ];

    const guides = [
        {
            title: "How to Connect Your WhatsApp Account",
            description: "Step-by-step guide to connecting your WhatsApp account using QR code scanning.",
            steps: [
                "Click 'Connect WhatsApp' in your dashboard",
                "Scan the QR code with your WhatsApp mobile app",
                "Wait for the connection to be established",
                "Your account is now connected and ready to use"
            ]
        },
        {
            title: "Importing Contacts",
            description: "Learn how to import and organize your contacts for bulk messaging.",
            steps: [
                "Go to the Contacts page",
                "Click 'Import Contacts' button",
                "Upload your CSV file (format: name, phone number)",
                "Review and confirm the import",
                "Organize contacts into groups"
            ]
        },
        {
            title: "Creating Your First Campaign",
            description: "Create and send your first WhatsApp bulk messaging campaign.",
            steps: [
                "Navigate to Campaigns page",
                "Click 'Create New Campaign'",
                "Select your WhatsApp account",
                "Choose target contacts or groups",
                "Write your message",
                "Schedule or send immediately"
            ]
        },
        {
            title: "Understanding Analytics",
            description: "Track and analyze your campaign performance with our analytics tools.",
            steps: [
                "Open your campaign from the Campaigns page",
                "View real-time delivery status",
                "Check read receipts and engagement",
                "Export reports for further analysis",
                "Use insights to optimize future campaigns"
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
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        How can we <span className="text-gradient">help you?</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Find guides, tutorials, and documentation to get the most out of BulkWaMsg
                    </p>
                </div>
            </section>

            {/* Help Categories */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {helpCategories.map((category, index) => (
                            <Link key={index} href={category.link}>
                                <Card className="hover:shadow-lg transition-all duration-300 h-full">
                                    <CardHeader>
                                        <div className="h-12 w-12 rounded-full bg-whatsapp/10 flex items-center justify-center mb-4">
                                            <category.icon className="h-6 w-6 text-whatsapp" />
                                        </div>
                                        <CardTitle>{category.title}</CardTitle>
                                        <CardDescription>{category.description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Start Guides */}
            <section id="getting-started" className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Quick Start Guides</h2>
                        <p className="text-muted-foreground">Follow these guides to get started quickly</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {guides.map((guide, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle>{guide.title}</CardTitle>
                                    <CardDescription>{guide.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ol className="space-y-3">
                                        {guide.steps.map((step, stepIndex) => (
                                            <li key={stepIndex} className="flex items-start gap-3">
                                                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-whatsapp text-white flex items-center justify-center text-sm font-medium">
                                                    {stepIndex + 1}
                                                </span>
                                                <span className="text-sm text-muted-foreground">{step}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Need More Help */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <Card className="glass-dark text-white p-12 text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl font-bold mb-4">Need More Help?</h2>
                        <p className="text-xl mb-8 text-gray-300">
                            Our support team is available 24/7 to assist you with any questions or issues.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact">
                                <Button size="lg" className="gradient-primary text-lg px-8 py-6">
                                    Contact Support
                                </Button>
                            </Link>
                            <Link href="/faq">
                                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white text-black hover:bg-gray-100">
                                    View FAQ
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
