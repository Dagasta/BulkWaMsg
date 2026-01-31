import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Home, Search } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center gradient-bg dark:gradient-bg-dark p-4">
            <Card className="glass p-12 text-center max-w-2xl">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-gradient mb-4">404</h1>
                    <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
                    <p className="text-xl text-muted-foreground mb-8">
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                        <Button size="lg" className="gradient-primary">
                            <Home className="mr-2 h-5 w-5" />
                            Go Home
                        </Button>
                    </Link>
                    <Link href="/help">
                        <Button size="lg" variant="outline">
                            <Search className="mr-2 h-5 w-5" />
                            Get Help
                        </Button>
                    </Link>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <Link href="/" className="flex items-center gap-2 justify-center text-muted-foreground hover:text-whatsapp transition">
                        <MessageSquare className="h-5 w-5" />
                        <span className="font-medium">Back to BulkWaMsg</span>
                    </Link>
                </div>
            </Card>
        </div>
    );
}
