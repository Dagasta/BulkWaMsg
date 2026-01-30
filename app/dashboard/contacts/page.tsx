"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Users, Upload, Plus, Trash2, Search } from "lucide-react";

interface Contact {
    id: string;
    name: string | null;
    phoneNumber: string;
    email: string | null;
    tags: string[];
    createdAt: Date;
}

export default function ContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [newContact, setNewContact] = useState({
        name: "",
        phoneNumber: "",
        email: "",
    });

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = async () => {
        try {
            const response = await fetch("/api/contacts");
            const data = await response.json();
            setContacts(data.contacts || []);
        } catch (error) {
            toast.error("Failed to load contacts");
        } finally {
            setLoading(false);
        }
    };

    const handleAddContact = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newContact.phoneNumber) {
            toast.error("Phone number is required");
            return;
        }

        try {
            const response = await fetch("/api/contacts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newContact),
            });

            if (!response.ok) {
                const data = await response.json();
                toast.error(data.error || "Failed to add contact");
                return;
            }

            toast.success("Contact added successfully");
            setNewContact({ name: "", phoneNumber: "", email: "" });
            setShowAddForm(false);
            await loadContacts();
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const handleImportCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/contacts/import", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || "Failed to import contacts");
                return;
            }

            toast.success(`Imported ${data.count} contacts successfully`);
            await loadContacts();
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const filteredContacts = contacts.filter(
        (contact) =>
            contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.phoneNumber.includes(searchTerm) ||
            contact.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Contacts</h1>
                    <p className="text-muted-foreground">Manage your contact list</p>
                </div>
                <div className="flex gap-2">
                    <label htmlFor="csv-upload">
                        <Button variant="outline" className="cursor-pointer" asChild>
                            <span>
                                <Upload className="mr-2 h-4 w-4" />
                                Import CSV
                            </span>
                        </Button>
                    </label>
                    <input
                        id="csv-upload"
                        type="file"
                        accept=".csv"
                        className="hidden"
                        onChange={handleImportCSV}
                    />
                    <Button onClick={() => setShowAddForm(!showAddForm)} className="gradient-primary">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Contact
                    </Button>
                </div>
            </div>

            {/* Add Contact Form */}
            {showAddForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>Add New Contact</CardTitle>
                        <CardDescription>Enter contact details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddContact} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        value={newContact.name}
                                        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Phone Number *</Label>
                                    <Input
                                        id="phone"
                                        placeholder="+1234567890"
                                        value={newContact.phoneNumber}
                                        onChange={(e) => setNewContact({ ...newContact, phoneNumber: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={newContact.email}
                                        onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" className="gradient-primary">Add Contact</Button>
                                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Search */}
            <Card>
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search contacts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Contacts List */}
            <Card>
                <CardHeader>
                    <CardTitle>All Contacts ({filteredContacts.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    {filteredContacts.length === 0 ? (
                        <div className="text-center py-12">
                            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <p className="text-lg font-medium mb-2">No contacts yet</p>
                            <p className="text-sm text-muted-foreground">
                                Add contacts manually or import from CSV
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-4">Name</th>
                                        <th className="text-left p-4">Phone Number</th>
                                        <th className="text-left p-4">Email</th>
                                        <th className="text-left p-4">Added</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredContacts.map((contact) => (
                                        <tr key={contact.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                                            <td className="p-4">{contact.name || "-"}</td>
                                            <td className="p-4 font-mono">{contact.phoneNumber}</td>
                                            <td className="p-4">{contact.email || "-"}</td>
                                            <td className="p-4 text-sm text-muted-foreground">
                                                {new Date(contact.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
