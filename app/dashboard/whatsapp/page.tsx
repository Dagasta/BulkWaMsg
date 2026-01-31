"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Smartphone, CheckCircle2, Loader2, Crown, Zap, Shield, Lock } from "lucide-react";
import Image from "next/image";
import { io, Socket } from "socket.io-client";
import { motion } from "framer-motion";

export default function WhatsAppPage() {
    const { data: session } = useSession();
    const [hasSubscription, setHasSubscription] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("monthly");
    const [sessionName, setSessionName] = useState("");
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [status, setStatus] = useState<string>("idle");
    const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
    const [connectLoading, setConnectLoading] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);

    useEffect(() => {
        checkSubscription();
    }, []);

    useEffect(() => {
        if (!hasSubscription) return;

        // Connect to Socket.IO for real-time updates
        const socketInstance = io(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3004");
        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, [hasSubscription]);

    useEffect(() => {
        if (!socket || !sessionId) return;

        socket.emit("subscribe", sessionId);

        socket.on("qr", (data: { qrCode: string }) => {
            setQrCode(data.qrCode);
            setStatus("qr_ready");
        });

        socket.on("ready", (data: { phoneNumber: string }) => {
            setPhoneNumber(data.phoneNumber);
            setStatus("connected");
            setQrCode(null);
        });

        socket.on("disconnected", () => {
            setStatus("disconnected");
            setQrCode(null);
        });

        return () => {
            socket.off("qr");
            socket.off("ready");
            socket.off("disconnected");
        };
    }, [socket, sessionId]);

    const checkSubscription = async () => {
        try {
            const response = await fetch("/api/subscription/status");
            const data = await response.json();
            setHasSubscription(data.hasActiveSubscription);
        } catch (error) {
            console.error("Error checking subscription:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubscribe = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/subscription/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plan: selectedPlan }),
            });

            const data = await response.json();

            if (data.approvalUrl) {
                // Redirect to PayPal
                window.location.href = data.approvalUrl;
            }
        } catch (error) {
            console.error("Error creating subscription:", error);
            alert("Failed to create subscription. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleConnect = async () => {
        if (!sessionName.trim()) {
            alert("Please enter a session name");
            return;
        }

        setConnectLoading(true);
        setStatus("connecting");

        try {
            const tempSessionId = `${session?.user?.id}-${Date.now()}`;
            setSessionId(tempSessionId);

            const serviceUrl = process.env.NEXT_PUBLIC_WHATSAPP_SERVICE_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
            const response = await fetch(`${serviceUrl}/session/init`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-service-secret": process.env.NEXT_PUBLIC_WHATSAPP_SERVICE_SECRET || "",
                },
                body: JSON.stringify({
                    sessionId: tempSessionId,
                    userId: session?.user?.id,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to initialize session");
            }

            setStatus("waiting_qr");
        } catch (error) {
            console.error("Error connecting:", error);
            alert("Failed to connect. Please try again.");
            setStatus("error");
        } finally {
            setConnectLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-whatsapp" />
            </div>
        );
    }

    if (!hasSubscription) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 bg-whatsapp/10 border border-whatsapp/30 rounded-full px-6 py-2 mb-6">
                            <Crown className="h-5 w-5 text-whatsapp" />
                            <span className="text-whatsapp font-medium">Premium Access Required</span>
                        </div>
                        <h1 className="text-5xl font-bold text-white mb-4">
                            Unlock WhatsApp Bulk Messaging
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Choose your plan and start sending unlimited messages to thousands of contacts
                        </p>
                    </motion.div>

                    {/* Pricing Toggle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex justify-center mb-12"
                    >
                        <Tabs value={selectedPlan} onValueChange={(v) => setSelectedPlan(v as "monthly" | "yearly")} className="w-full max-w-md">
                            <TabsList className="grid w-full grid-cols-2 bg-white/10">
                                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                                <TabsTrigger value="yearly">
                                    Yearly
                                    <Badge className="ml-2 bg-green-500">Save 17%</Badge>
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </motion.div>

                    {/* Pricing Cards */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
                        {/* Monthly Plan */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className={`relative overflow-hidden ${selectedPlan === "monthly" ? "ring-2 ring-whatsapp shadow-2xl shadow-whatsapp/20" : "glass-card"} border-white/10`}>
                                {selectedPlan === "monthly" && (
                                    <div className="absolute top-0 right-0 bg-whatsapp text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                                        Selected
                                    </div>
                                )}
                                <CardHeader className="text-center pb-8">
                                    <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                        <Zap className="h-8 w-8 text-white" />
                                    </div>
                                    <CardTitle className="text-3xl text-gray-900 dark:text-white">Monthly Plan</CardTitle>
                                    <CardDescription className="text-gray-600 dark:text-gray-300">Perfect for getting started</CardDescription>
                                    <div className="mt-6">
                                        <span className="text-6xl font-bold text-gray-900 dark:text-white">$10</span>
                                        <span className="text-gray-600 dark:text-gray-400">/month</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        {[
                                            "Unlimited WhatsApp messages",
                                            "Unlimited contacts",
                                            "Multiple WhatsApp accounts",
                                            "Advanced analytics",
                                            "Campaign scheduling",
                                            "Anti-ban protection",
                                            "24/7 support",
                                        ].map((feature, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        onClick={() => {
                                            setSelectedPlan("monthly");
                                            handleSubscribe();
                                        }}
                                        disabled={loading}
                                        className="w-full gradient-primary text-lg py-6 mt-6"
                                    >
                                        {loading && selectedPlan === "monthly" ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Lock className="mr-2 h-5 w-5" />
                                                Subscribe with PayPal
                                            </>
                                        )}
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Yearly Plan */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className={`relative overflow-hidden ${selectedPlan === "yearly" ? "ring-2 ring-whatsapp shadow-2xl shadow-whatsapp/20" : "glass-card"} border-white/10`}>
                                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center py-2 text-sm font-medium">
                                    🎉 BEST VALUE - Save $24/year
                                </div>
                                {selectedPlan === "yearly" && (
                                    <div className="absolute top-10 right-0 bg-whatsapp text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                                        Selected
                                    </div>
                                )}
                                <CardHeader className="text-center pb-8 pt-12">
                                    <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                                        <Crown className="h-8 w-8 text-white" />
                                    </div>
                                    <CardTitle className="text-3xl text-gray-900 dark:text-white">Yearly Plan</CardTitle>
                                    <CardDescription className="text-gray-600 dark:text-gray-300">Best value for serious users</CardDescription>
                                    <div className="mt-6">
                                        <span className="text-6xl font-bold text-gray-900 dark:text-white">$120</span>
                                        <span className="text-gray-600 dark:text-gray-400">/year</span>
                                    </div>
                                    <p className="text-green-600 dark:text-green-400 font-medium mt-2">Only $10/month - Save 17%</p>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        {[
                                            "Everything in Monthly Plan",
                                            "Priority support",
                                            "Early access to new features",
                                            "Dedicated account manager",
                                            "Custom integrations",
                                            "Advanced API access",
                                            "White-label options",
                                        ].map((feature, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        onClick={() => {
                                            setSelectedPlan("yearly");
                                            handleSubscribe();
                                        }}
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg py-6 mt-6"
                                    >
                                        {loading && selectedPlan === "yearly" ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Crown className="mr-2 h-5 w-5" />
                                                Subscribe with PayPal
                                            </>
                                        )}
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Features */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                    >
                        {[
                            {
                                icon: Shield,
                                title: "Secure & Safe",
                                description: "Bank-level encryption and PayPal protection",
                            },
                            {
                                icon: Zap,
                                title: "Instant Access",
                                description: "Start sending messages immediately after payment",
                            },
                            {
                                icon: Crown,
                                title: "Cancel Anytime",
                                description: "No long-term commitment, cancel whenever you want",
                            },
                        ].map((feature, i) => (
                            <Card key={i} className="glass-card border-white/10 text-center bg-white/90 dark:bg-gray-800/90">
                                <CardContent className="pt-6">
                                    <feature.icon className="h-10 w-10 text-whatsapp mx-auto mb-3" />
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </motion.div>
                </div>
            </div>
        );
    }

    // User has subscription - show WhatsApp connection
    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">WhatsApp Connections</h1>
                        <p className="text-muted-foreground">
                            Connect your WhatsApp accounts to start sending bulk messages
                        </p>
                    </div>
                    <Badge className="bg-green-500">
                        <Crown className="h-4 w-4 mr-1" />
                        Premium Active
                    </Badge>
                </div>
            </div>

            <Card className="glass-card">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Smartphone className="h-6 w-6" />
                        Connect New WhatsApp Account
                    </CardTitle>
                    <CardDescription>
                        Scan the QR code with your WhatsApp mobile app to connect
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {status === "idle" && (
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="sessionName">Session Name</Label>
                                <Input
                                    id="sessionName"
                                    placeholder="e.g., My Business Account"
                                    value={sessionName}
                                    onChange={(e) => setSessionName(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleConnect()}
                                />
                            </div>
                            <Button
                                onClick={handleConnect}
                                disabled={connectLoading}
                                className="w-full gradient-primary text-lg py-6"
                            >
                                {connectLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Connecting...
                                    </>
                                ) : (
                                    <>
                                        <QrCode className="mr-2 h-5 w-5" />
                                        Generate QR Code
                                    </>
                                )}
                            </Button>
                        </div>
                    )}

                    {(status === "connecting" || status === "waiting_qr") && !qrCode && (
                        <div className="text-center py-12">
                            <Loader2 className="h-16 w-16 animate-spin text-whatsapp mx-auto mb-4" />
                            <p className="text-lg font-medium">Generating QR Code...</p>
                            <p className="text-sm text-muted-foreground mt-2">
                                This may take up to 30 seconds
                            </p>
                        </div>
                    )}

                    {qrCode && status === "qr_ready" && (
                        <div className="space-y-4">
                            <div className="text-center">
                                <p className="text-lg font-medium mb-4">Scan this QR Code with WhatsApp</p>
                                <div className="flex justify-center p-6 bg-white rounded-lg">
                                    <Image
                                        src={qrCode}
                                        alt="WhatsApp QR Code"
                                        width={300}
                                        height={300}
                                        className="rounded"
                                    />
                                </div>
                                <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                                    <p>1. Open WhatsApp on your phone</p>
                                    <p>2. Go to Settings → Linked Devices</p>
                                    <p>3. Tap "Link a Device"</p>
                                    <p>4. Scan this QR code</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {status === "connected" && phoneNumber && (
                        <div className="text-center py-12">
                            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                            <p className="text-2xl font-bold mb-2">Connected!</p>
                            <p className="text-lg text-muted-foreground">
                                Phone: +{phoneNumber}
                            </p>
                            <Button
                                onClick={() => window.location.href = "/dashboard/campaigns"}
                                className="mt-6 gradient-primary"
                            >
                                Start Sending Messages
                            </Button>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="text-center py-12">
                            <p className="text-red-500 mb-4">Connection failed. Please try again.</p>
                            <Button
                                onClick={() => {
                                    setStatus("idle");
                                    setQrCode(null);
                                    setSessionId(null);
                                }}
                                variant="outline"
                            >
                                Try Again
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
