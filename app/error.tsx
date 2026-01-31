"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, RefreshCw, Home } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center gradient-bg dark:gradient-bg-dark p-4">
            <Card className="glass p-12 text-center max-w-2xl">
                <div className="mb-8">
                    <h1 className="text-6xl font-bold text-gradient mb-4">Oops!</h1>
                    <h2 className="text-3xl font-bold mb-4">Something went wrong</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        We encountered an unexpected error. Don't worry, our team has been notified.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="gradient-primary" onClick={reset}>
                        <RefreshCw className="mr-2 h-5 w-5" />
                        Try Again
                    </Button>
                    <Link href="/">
                        <Button size="lg" variant="outline">
                            <Home className="mr-2 h-5 w-5" />
                            Go Home
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
