"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { getStoreConfig, updateStoreConfig } from "@/app/actions/settings";
import { Loader2, Phone, Store, Clock, Mail, Instagram, Music2, Lock, Eye, EyeOff } from "lucide-react";

// TikTok Icon SVG
const TikTokIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
);

interface SettingsState {
    storeName: string;
    storeAddress: string;
    operatingHours: string;
    businessEmail: string;
    whatsappNumber: string;
    instagramUrl: string;
    tiktokUrl: string;
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<SettingsState>({
        storeName: "",
        storeAddress: "",
        operatingHours: "",
        businessEmail: "",
        whatsappNumber: "",
        instagramUrl: "",
        tiktokUrl: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Password change state
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);

    useEffect(() => {
        async function load() {
            const keys = [
                "STORE_NAME",
                "STORE_ADDRESS",
                "OPERATING_HOURS",
                "BUSINESS_EMAIL",
                "WHATSAPP_NUMBER",
                "INSTAGRAM_URL",
                "TIKTOK_URL",
            ];

            const results = await Promise.all(keys.map(key => getStoreConfig(key)));

            setSettings({
                storeName: results[0].value || "HWest Florist",
                storeAddress: results[1].value || "",
                operatingHours: results[2].value || "08:00 - 22:00 WIB",
                businessEmail: results[3].value || "",
                whatsappNumber: results[4].value || "",
                instagramUrl: results[5].value || "https://www.instagram.com/hwest_florist/",
                tiktokUrl: results[6].value || "",
            });
            setLoading(false);
        }
        load();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const updates = [
                updateStoreConfig("STORE_NAME", settings.storeName),
                updateStoreConfig("STORE_ADDRESS", settings.storeAddress),
                updateStoreConfig("OPERATING_HOURS", settings.operatingHours),
                updateStoreConfig("BUSINESS_EMAIL", settings.businessEmail),
                updateStoreConfig("WHATSAPP_NUMBER", settings.whatsappNumber),
                updateStoreConfig("INSTAGRAM_URL", settings.instagramUrl),
                updateStoreConfig("TIKTOK_URL", settings.tiktokUrl),
            ];

            await Promise.all(updates);
            toast.success("Pengaturan berhasil disimpan");
        } catch {
            toast.error("Gagal menyimpan pengaturan");
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Password baru tidak cocok");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("Password minimal 6 karakter");
            return;
        }

        setChangingPassword(true);
        try {
            const res = await fetch("/api/admin/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Password berhasil diubah");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                toast.error(data.error || "Gagal mengubah password");
            }
        } catch {
            toast.error("Terjadi kesalahan");
        } finally {
            setChangingPassword(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="flex flex-col space-y-6 p-4 md:p-0 max-w-2xl">
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">Pengaturan Toko</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Kelola informasi dan konfigurasi toko Anda</p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                {/* Store Info Card */}
                <Card className="border-slate-200 dark:border-slate-700">
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <Store className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <CardTitle className="text-base md:text-lg">Informasi Toko</CardTitle>
                                <CardDescription className="text-xs md:text-sm">Nama, alamat, dan jam operasional</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="storeName" className="text-sm font-medium">Nama Toko</Label>
                            <Input
                                id="storeName"
                                value={settings.storeName}
                                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                                placeholder="HWest Florist"
                                className="text-base"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="storeAddress" className="text-sm font-medium">Alamat Toko</Label>
                            <Input
                                id="storeAddress"
                                value={settings.storeAddress}
                                onChange={(e) => setSettings({ ...settings, storeAddress: e.target.value })}
                                placeholder="Pasar STC, Sagulung, Batam"
                                className="text-base"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="operatingHours" className="text-sm font-medium flex items-center gap-2">
                                <Clock className="w-4 h-4 text-slate-400" />
                                Jam Operasional
                            </Label>
                            <Input
                                id="operatingHours"
                                value={settings.operatingHours}
                                onChange={(e) => setSettings({ ...settings, operatingHours: e.target.value })}
                                placeholder="08:00 - 22:00 WIB"
                                className="text-base"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Card */}
                <Card className="border-slate-200 dark:border-slate-700">
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <CardTitle className="text-base md:text-lg">Kontak</CardTitle>
                                <CardDescription className="text-xs md:text-sm">WhatsApp dan email bisnis</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="wa" className="text-sm font-medium">Nomor WhatsApp</Label>
                            <Input
                                id="wa"
                                value={settings.whatsappNumber}
                                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                                placeholder="628123456789"
                                className="text-base"
                            />
                            <p className="text-xs text-muted-foreground">Format: 628... (Tanpa simbol + atau spasi)</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                                <Mail className="w-4 h-4 text-slate-400" />
                                Email Bisnis
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={settings.businessEmail}
                                onChange={(e) => setSettings({ ...settings, businessEmail: e.target.value })}
                                placeholder="hwest.florist@gmail.com"
                                className="text-base"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Social Media Card */}
                <Card className="border-slate-200 dark:border-slate-700">
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                                <Instagram className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                            </div>
                            <div>
                                <CardTitle className="text-base md:text-lg">Media Sosial</CardTitle>
                                <CardDescription className="text-xs md:text-sm">Link Instagram dan TikTok</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="instagram" className="text-sm font-medium flex items-center gap-2">
                                <Instagram className="w-4 h-4 text-pink-500" />
                                Instagram
                            </Label>
                            <Input
                                id="instagram"
                                value={settings.instagramUrl}
                                onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                                placeholder="https://www.instagram.com/hwest_florist/"
                                className="text-base"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tiktok" className="text-sm font-medium flex items-center gap-2">
                                <TikTokIcon className="w-4 h-4" />
                                TikTok
                            </Label>
                            <Input
                                id="tiktok"
                                value={settings.tiktokUrl}
                                onChange={(e) => setSettings({ ...settings, tiktokUrl: e.target.value })}
                                placeholder="https://www.tiktok.com/@hwest_florist"
                                className="text-base"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Button type="submit" disabled={saving} className="w-full sm:w-auto">
                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Simpan Perubahan
                </Button>
            </form>

            {/* Password Change Card - Separate Form */}
            <Card className="border-slate-200 dark:border-slate-700 border-red-200 dark:border-red-900/50">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                            <Lock className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                            <CardTitle className="text-base md:text-lg">Keamanan</CardTitle>
                            <CardDescription className="text-xs md:text-sm">Ubah password admin</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword" className="text-sm font-medium">Password Saat Ini</Label>
                            <div className="relative">
                                <Input
                                    id="currentPassword"
                                    type={showCurrentPassword ? "text" : "password"}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="Masukkan password saat ini"
                                    className="text-base pr-10 [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="newPassword" className="text-sm font-medium">Password Baru</Label>
                            <div className="relative">
                                <Input
                                    id="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Minimal 6 karakter"
                                    className="text-base pr-10 [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-medium">Konfirmasi Password Baru</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Ulangi password baru"
                                className="text-base"
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="destructive"
                            disabled={changingPassword || !currentPassword || !newPassword || !confirmPassword}
                            className="w-full sm:w-auto"
                        >
                            {changingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Ubah Password
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
