"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { getStoreConfig, updateStoreConfig } from "@/app/actions/settings";
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
    const [waNumber, setWaNumber] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function load() {
            // Load WhatsApp Number
            const res = await getStoreConfig("WHATSAPP_NUMBER");
            if (res.success && res.value) {
                setWaNumber(res.value);
            } else {
                // Fallback to Env or Default if not in DB
                // For MVP, we'll just leave empty or use a default if strict
            }
            setLoading(false);
        }
        load();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await updateStoreConfig("WHATSAPP_NUMBER", waNumber);
            if (res.success) {
                toast.success("Settings saved successfully");
            } else {
                toast.error("Failed to save settings");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading settings...</div>;

    return (
        <div className="flex flex-col space-y-4 max-w-2xl">
            <h1 className="text-2xl font-bold">Store Settings</h1>

            <form onSubmit={handleSave}>
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>Manage how customers contact you.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="wa">WhatsApp Number</Label>
                            <Input
                                id="wa"
                                value={waNumber}
                                onChange={(e) => setWaNumber(e.target.value)}
                                placeholder="e.g. 628123456789"
                            />
                            <p className="text-xs text-muted-foreground">Format: 628... (No symbols)</p>
                        </div>
                        <Button type="submit" disabled={saving}>
                            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
