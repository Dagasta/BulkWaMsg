"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Send, Plus, Play, Pause, CheckCircle2, XCircle, Clock } from "lucide-react";

interface Campaign {
    id: string;
    name: string;
    message: string;
    status: string;
    totalContacts: number;
    sentCount: number;
    deliveredCount: number;
    failedCount: number;
    createdAt: Date;
    scheduledAt: Date | null;
}

export default function CampaignsPage() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [sessions, setSessions] = useState<any[]>([]);
    const [newCampaign, setNewCampaign] = useState({
        name: "",
        message: "",
        sessionId: "",
    });

    useEffect(() => {
        loadCampaigns();
        loadSessions();
    }, []);

    const loadCampaigns = async () => {
        try {
            const response = await fetch("/api/campaigns");
            const data = await response.json();
            setCampaigns(data.campaigns || []);
        } catch (error) {
            toast.error("Failed to load campaigns");
        } finally {
            setLoading(false);
        }
    };

    const loadSessions = async () => {
        try {
            const response = await fetch("/api/whatsapp/sessions");
            const data = await response.json();
            setSessions(data.sessions.filter((s: any) => s.status === "CONNECTED"));
        } catch (error) {
            console.error("Failed to load sessions");
        }
    };

    const handleCreateCampaign = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newCampaign.name || !newCampaign.message || !newCampaign.sessionId) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const response = await fetch("/api/campaigns", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCampaign),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || "Failed to create campaign");
                return;
            }

            toast.success("Campaign created successfully");
            setNewCampaign({ name: "", message: "", sessionId: "" });
            setShowCreateForm(false);
            await loadCampaigns();
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const handleSendCampaign = async (campaignId: string) => {
        try {
            const response = await fetch(`/api/campaigns/${campaignId}/send`, {
                method: "POST",
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || "Failed to send campaign");
                return;
            }

            toast.success("Campaign started successfully");
            await loadCampaigns();
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "COMPLETED":
                return <CheckCircle2 className="h-5 w-5 text-green-600" />;
            case "FAILED":
                return <XCircle className="h-5 w-5 text-red-600" />;
            case "RUNNING":
                return <Play className="h-5 w-5 text-blue-600" />;
            case "SCHEDULED":
                return <Clock className="h-5 w-5 text-yellow-600" />;
            default:
                return <Pause className="h-5 w-5 text-gray-400" />;
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Campaigns</h1>
                    <p className="text-muted-foreground">Create and manage bulk messaging campaigns</p>
                </div>
                <Button onClick={() => setShowCreateForm(!showCreateForm)} className="gradient-primary">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Campaign
                </Button>
            </div>

            {/* Create Campaign Form */}
            {showCreateForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>Create New Campaign</CardTitle>
                        <CardDescription>Set up your bulk messaging campaign</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleCreateCampaign} className="space-y-4">
                            <div>
                                <Label htmlFor="campaignName">Campaign Name</Label>
                                <Input
                                    id="campaignName"
                                    placeholder="e.g., Product Launch Announcement"
                                    value={newCampaign.name}
                                    onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="session">WhatsApp Account</Label>
                                <select
                                    id="session"
                                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                                    value={newCampaign.sessionId}
                                    onChange={(e) => setNewCampaign({ ...newCampaign, sessionId: e.target.value })}
                                    required
                                >
                                    <option value="">Select WhatsApp account</option>
                                    {sessions.map((session) => (
                                        <option key={session.id} value={session.id}>
                                            {session.name} (+{session.phoneNumber})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <Label htmlFor="message">Message</Label>
                                <textarea
                                    id="message"
                                    className="w-full min-h-32 rounded-md border border-input bg-background px-3 py-2"
                                    placeholder="Enter your message here..."
                                    value={newCampaign.message}
                                    onChange={(e) => setNewCampaign({ ...newCampaign, message: e.target.value })}
                                    required
                                />
                                <p className="text-sm text-muted-foreground mt-1">
                                    Character count: {newCampaign.message.length}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" className="gradient-primary">Create Campaign</Button>
                                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Campaigns List */}
            <div className="grid gap-6">
                {campaigns.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Send className="h-16 w-16 text-muted-foreground mb-4" />
                            <p className="text-lg font-medium mb-2">No campaigns yet</p>
                            <p className="text-sm text-muted-foreground">
                                Create your first campaign to start sending bulk messages
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    campaigns.map((campaign) => (
                        <Card key={campaign.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle>{campaign.name}</CardTitle>
                                        <CardDescription className="flex items-center gap-2 mt-2">
                                            {getStatusIcon(campaign.status)}
                                            <span>{campaign.status}</span>
                                        </CardDescription>
                                    </div>
                                    {campaign.status === "DRAFT" && (
                                        <Button
                                            onClick={() => handleSendCampaign(campaign.id)}
                                            className="gradient-primary"
                                        >
                                            <Play className="mr-2 h-4 w-4" />
                                            Send Now
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium mb-2">Message Preview:</p>
                                        <p className="text-sm text-muted-foreground bg-gray-100 dark:bg-gray-800 p-3 rounded">
                                            {campaign.message}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Total</p>
                                            <p className="text-2xl font-bold">{campaign.totalContacts}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Sent</p>
                                            <p className="text-2xl font-bold text-blue-600">{campaign.sentCount}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Delivered</p>
                                            <p className="text-2xl font-bold text-green-600">{campaign.deliveredCount}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Failed</p>
                                            <p className="text-2xl font-bold text-red-600">{campaign.failedCount}</p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Created: {new Date(campaign.createdAt).toLocaleString()}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
