"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Smartphone, CheckCircle2, Loader2 } from "lucide-react";
import Image from "next/image";
import { io, Socket } from "socket.io-client";

export default function QuickConnectPage() {
    const [sessionName, setSessionName] = useState("");
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [status, setStatus] = useState<string>("idle");
    const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);

    useEffect(() => {
        // Connect to Socket.IO for real-time updates
        const socketInstance = io(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3004");
        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!socket || !sessionId) return;

        // Subscribe to session updates
        socket.emit("subscribe", sessionId);

        // Listen for QR code
        socket.on("qr", (data: { qrCode: string }) => {
            setQrCode(data.qrCode);
            setStatus("qr_ready");
        });

        // Listen for connection
        socket.on("ready", (data: { phoneNumber: string }) => {
            setPhoneNumber(data.phoneNumber);
            setStatus("connected");
            setQrCode(null);
        });

        // Listen for disconnection
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

    const handleConnect = async () => {
        if (!sessionName.trim()) {
            alert("Please enter a session name");
            return;
        }

        setLoading(true);
        setStatus("connecting");

        try {
            // Create a temporary session ID
            const tempSessionId = `quick-${Date.now()}`;
            setSessionId(tempSessionId);

            // Initialize WhatsApp client via service
            const serviceUrl = process.env.NEXT_PUBLIC_WHATSAPP_SERVICE_URL || "http://localhost:3001";
            const response = await fetch(`${serviceUrl}/session/init`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-service-secret": process.env.NEXT_PUBLIC_WHATSAPP_SERVICE_SECRET || "Ee99OkD+Vn64pr8OpOa9e7s177WPzA3m1k/A3BBJntdg=",
                },
                body: JSON.stringify({
                    sessionId: tempSessionId,
                    userId: "quick-connect",
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
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        BulkWaMsg
                    </h1>
                    <p className="text-xl text-gray-300">
                        Connect Your WhatsApp - Get QR Code Instantly
                    </p>
                </div>

                {/* Main Card */}
                <Card className="glass-card border-white/10">
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <Smartphone className="h-6 w-6" />
                            Quick Connect
                        </CardTitle>
                        <CardDescription>
                            No signup required - Connect your WhatsApp in seconds
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
                                    disabled={loading}
                                    className="w-full gradient-primary text-lg py-6"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Connecting...
                                        </>
                                    ) : (
                                        <>
                                            <QrCode className="mr-2 h-5 w-5" />
                                            Get QR Code
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
                                    onClick={() => window.location.href = "/auth/register"}
                                    className="mt-6 gradient-primary"
                                >
                                    Create Account to Start Messaging
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

                {/* Footer */}
                <div className="text-center mt-6 text-gray-400 text-sm">
                    <p>Already have an account? <a href="/auth/login" className="text-whatsapp hover:underline">Login</a></p>
                </div>
            </div>
        </div>
    );
}
