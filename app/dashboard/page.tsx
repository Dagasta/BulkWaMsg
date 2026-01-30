import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, Send, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
    const session = await auth();

    const [subscription, sessions, contacts, campaigns, analytics] = await Promise.all([
        prisma.subscription.findUnique({
            where: { userId: session!.user.id },
        }),
        prisma.whatsAppSession.count({
            where: { userId: session!.user.id },
        }),
        prisma.contact.count({
            where: { userId: session!.user.id },
        }),
        prisma.campaign.count({
            where: { userId: session!.user.id },
        }),
        prisma.message.groupBy({
            by: ['status'],
            where: {
                campaign: {
                    userId: session!.user.id,
                },
            },
            _count: true,
        }),
    ]);

    const messagesSent = analytics.find(a => a.status === 'SENT')?._count || 0;
    const messagesDelivered = analytics.find(a => a.status === 'DELIVERED')?._count || 0;
    const messagesFailed = analytics.find(a => a.status === 'FAILED')?._count || 0;
    const totalMessages = messagesSent + messagesDelivered + messagesFailed;

    const stats = [
        {
            title: "Messages Sent",
            value: `${subscription?.messagesUsed || 0} / ${subscription?.messagesLimit || 0}`,
            icon: MessageSquare,
            color: "text-blue-600",
        },
        {
            title: "WhatsApp Accounts",
            value: `${sessions} / ${subscription?.sessionsLimit || 0}`,
            icon: MessageSquare,
            color: "text-whatsapp",
        },
        {
            title: "Total Contacts",
            value: contacts.toString(),
            icon: Users,
            color: "text-purple-600",
        },
        {
            title: "Campaigns",
            value: campaigns.toString(),
            icon: Send,
            color: "text-orange-600",
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back! Here's your overview.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Message Statistics</CardTitle>
                        <CardDescription>Your messaging performance</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm">Total Sent</span>
                            <span className="font-bold">{totalMessages}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm">Delivered</span>
                            <span className="font-bold text-green-600">{messagesDelivered}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm">Failed</span>
                            <span className="font-bold text-red-600">{messagesFailed}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm">Delivery Rate</span>
                            <span className="font-bold text-whatsapp">
                                {totalMessages > 0 ? Math.round((messagesDelivered / totalMessages) * 100) : 0}%
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Get started with these actions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <a href="/dashboard/whatsapp" className="block p-3 bg-whatsapp/10 hover:bg-whatsapp/20 rounded-lg transition">
                            <p className="font-medium">Connect WhatsApp</p>
                            <p className="text-sm text-muted-foreground">Scan QR code to connect your account</p>
                        </a>
                        <a href="/dashboard/contacts" className="block p-3 bg-purple-100 dark:bg-purple-900/20 hover:bg-purple-200 dark:hover:bg-purple-900/30 rounded-lg transition">
                            <p className="font-medium">Import Contacts</p>
                            <p className="text-sm text-muted-foreground">Upload your contact list</p>
                        </a>
                        <a href="/dashboard/campaigns" className="block p-3 bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-900/30 rounded-lg transition">
                            <p className="font-medium">Create Campaign</p>
                            <p className="text-sm text-muted-foreground">Start sending bulk messages</p>
                        </a>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
