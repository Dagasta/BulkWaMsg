import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Send, BarChart3, Settings, LogOut } from "lucide-react";
import { Providers } from "@/components/providers";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/login");
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            subscription: true,
        },
    });

    return (
        <Providers>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Sidebar */}
                <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="h-8 w-8 text-whatsapp" />
                            <span className="text-xl font-bold text-gradient">BulkWaMsg</span>
                        </div>
                    </div>

                    <nav className="flex-1 p-4 space-y-2">
                        <Link href="/dashboard">
                            <Button variant="ghost" className="w-full justify-start">
                                <BarChart3 className="mr-2 h-5 w-5" />
                                Dashboard
                            </Button>
                        </Link>
                        <Link href="/dashboard/whatsapp">
                            <Button variant="ghost" className="w-full justify-start">
                                <MessageSquare className="mr-2 h-5 w-5" />
                                WhatsApp
                            </Button>
                        </Link>
                        <Link href="/dashboard/contacts">
                            <Button variant="ghost" className="w-full justify-start">
                                <Users className="mr-2 h-5 w-5" />
                                Contacts
                            </Button>
                        </Link>
                        <Link href="/dashboard/campaigns">
                            <Button variant="ghost" className="w-full justify-start">
                                <Send className="mr-2 h-5 w-5" />
                                Campaigns
                            </Button>
                        </Link>
                        <Link href="/dashboard/settings">
                            <Button variant="ghost" className="w-full justify-start">
                                <Settings className="mr-2 h-5 w-5" />
                                Settings
                            </Button>
                        </Link>
                    </nav>

                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                            <p className="text-sm font-medium">{user?.name}</p>
                            <p className="text-xs text-muted-foreground">{user?.email}</p>
                            <p className="text-xs mt-2 font-medium text-whatsapp">
                                {user?.subscription?.plan || "Free"} Plan
                            </p>
                        </div>
                        <form action={async () => {
                            "use server";
                            const { signOut } = await import("@/lib/auth");
                            await signOut();
                        }}>
                            <Button variant="outline" className="w-full" type="submit">
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        </form>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="ml-64 p-8">
                    {children}
                </main>
            </div>
        </Providers>
    );
}
