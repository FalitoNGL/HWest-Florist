"use client";

import { useState, useEffect } from "react";
import { MapPin, MessageCircle, ArrowRight, Flower2, Calendar, User, FileText, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/mobile/bottom-nav";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

// Animated Floating Petals - using fixed values to avoid hydration mismatch
const FloatingPetals = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Fixed positions to avoid hydration mismatch
    const petals = [
        { id: 0, size: 18, left: 5, delay: 0, duration: 18, rotation: 45 },
        { id: 1, size: 22, left: 15, delay: 2, duration: 22, rotation: 90 },
        { id: 2, size: 16, left: 25, delay: 4, duration: 20, rotation: 135 },
        { id: 3, size: 20, left: 35, delay: 1, duration: 25, rotation: 180 },
        { id: 4, size: 24, left: 45, delay: 3, duration: 19, rotation: 225 },
        { id: 5, size: 17, left: 55, delay: 5, duration: 21, rotation: 270 },
        { id: 6, size: 21, left: 65, delay: 2, duration: 23, rotation: 315 },
        { id: 7, size: 19, left: 75, delay: 4, duration: 17, rotation: 60 },
        { id: 8, size: 23, left: 85, delay: 1, duration: 24, rotation: 120 },
        { id: 9, size: 15, left: 95, delay: 3, duration: 16, rotation: 200 },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {petals.map((petal) => (
                <div
                    key={petal.id}
                    className="absolute animate-fall"
                    style={{
                        left: `${petal.left}%`,
                        top: '-50px',
                        animationDelay: `${petal.delay}s`,
                        animationDuration: `${petal.duration}s`,
                    }}
                >
                    <svg
                        width={petal.size}
                        height={petal.size}
                        viewBox="0 0 24 24"
                        className="text-[#FF2E93]/20"
                        style={{ transform: `rotate(${petal.rotation}deg)` }}
                    >
                        <path
                            fill="currentColor"
                            d="M12 2C13.5 2 15 3.5 15 5.5C15 7.5 13.5 9 12 10C10.5 9 9 7.5 9 5.5C9 3.5 10.5 2 12 2Z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 22C10.5 22 9 20.5 9 18.5C9 16.5 10.5 15 12 14C13.5 15 15 16.5 15 18.5C15 20.5 13.5 22 12 22Z"
                        />
                    </svg>
                </div>
            ))}
        </div>
    );
};

// Glowing Orbs
const GlowingOrbs = () => (
    <>
        <div className="absolute top-20 left-[10%] w-32 h-32 bg-[#FF2E93]/20 rounded-full blur-[80px] animate-pulse-slow" />
        <div className="absolute top-60 right-[15%] w-40 h-40 bg-[#c026d3]/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-60 left-[20%] w-48 h-48 bg-[#FF2E93]/15 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-20 right-[10%] w-36 h-36 bg-[#c026d3]/15 rounded-full blur-[90px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
    </>
);

// Decorative Lines
const DecorativeLines = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[15%] -left-1/4 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-[#FF2E93]/20 to-transparent rotate-12" />
        <div className="absolute top-[50%] -left-1/4 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-[#c026d3]/20 to-transparent -rotate-6" />
        <div className="absolute top-[85%] -left-1/4 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-[#FF2E93]/10 to-transparent rotate-3" />
    </div>
);

// Floating Hearts - using fixed values to avoid hydration mismatch
const FloatingHearts = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Fixed positions to avoid hydration mismatch
    const hearts = [
        { id: 0, size: 12, left: 15, delay: 0, duration: 12 },
        { id: 1, size: 16, left: 30, delay: 2, duration: 14 },
        { id: 2, size: 14, left: 50, delay: 4, duration: 16 },
        { id: 3, size: 18, left: 70, delay: 1, duration: 13 },
        { id: 4, size: 13, left: 85, delay: 3, duration: 15 },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {hearts.map((heart) => (
                <div
                    key={heart.id}
                    className="absolute animate-float-up opacity-0"
                    style={{
                        left: `${heart.left}%`,
                        bottom: '-30px',
                        animationDelay: `${heart.delay}s`,
                        animationDuration: `${heart.duration}s`,
                    }}
                >
                    <Heart
                        className="text-[#FF2E93]/15 fill-[#FF2E93]/10"
                        style={{ width: heart.size, height: heart.size }}
                    />
                </div>
            ))}
        </div>
    );
};


export default function OrderPage() {
    const whatsappNumber = process.env.NEXT_PUBLIC_WA_PHONE || "6281270121705";

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        productType: "",
        occasion: "",
        recipientName: "",
        senderName: "",
        message: "",
        deliveryDate: "",
        deliveryAddress: "",
        notes: "",
    });

    const productTypes = [
        { value: "BOARD_FLOWER", label: "Papan Bunga", desc: "Untuk pernikahan, pembukaan, duka cita", icon: "🌸" },
        { value: "BOARD_RUSTIC", label: "Papan Rustik", desc: "Papan bunga dengan tema rustic", icon: "🪵" },
        { value: "BOARD_ACRYLIC", label: "Papan Akrilik", desc: "Papan bunga modern dengan akrilik", icon: "✨" },
        { value: "BOUQUET", label: "Buket Bunga", desc: "Untuk hadiah, anniversary, graduation", icon: "💐" },
        { value: "BOUQUET_MONEY", label: "Buket Uang", desc: "Buket dengan uang asli", icon: "💵" },
        { value: "BOUQUET_SNACK", label: "Buket Snack", desc: "Buket berisi snack favorit", icon: "🍫" },
        { value: "TABLE_FLOWER", label: "Bunga Meja", desc: "Rangkaian bunga untuk dekorasi meja", icon: "🌺" },
        { value: "STANDING_FLOWER", label: "Standing Flower", desc: "Untuk acara formal dan resmi", icon: "🌷" },
        { value: "DECORATION", label: "Dekorasi Bunga", desc: "Untuk dekorasi acara", icon: "🎊" },
        { value: "CUSTOM", label: "Custom", desc: "Pesan sesuai keinginan Anda", icon: "🎨" },
    ];

    const occasions = [
        "Pernikahan / Wedding",
        "Grand Opening",
        "Ulang Tahun",
        "Anniversary",
        "Wisuda / Graduation",
        "Ucapan Terima Kasih",
        "Duka Cita",
        "Lainnya",
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const generateWhatsAppMessage = () => {
        const productLabel = productTypes.find(p => p.value === formData.productType)?.label || formData.productType;

        let message = `Halo HWest Florist!\n\n`;
        message += `Saya ingin memesan:\n`;
        message += `--------------------\n`;
        message += `*Jenis*: ${productLabel}\n`;
        message += `*Acara*: ${formData.occasion}\n`;

        if (formData.recipientName) {
            message += `*Kepada*: ${formData.recipientName}\n`;
        }
        if (formData.senderName) {
            message += `*Dari*: ${formData.senderName}\n`;
        }
        if (formData.message) {
            message += `*Pesan Kartu*: ${formData.message}\n`;
        }

        message += `--------------------\n`;
        message += `*Tanggal Kirim*: ${formData.deliveryDate}\n`;
        message += `*Alamat*: ${formData.deliveryAddress}\n`;

        if (formData.notes) {
            message += `*Catatan*: ${formData.notes}\n`;
        }

        message += `--------------------\n`;
        message += `*Nama Pemesan*: ${formData.name}\n`;
        message += `*No. HP*: ${formData.phone}\n`;
        message += `\nTerima kasih!`;

        return encodeURIComponent(message);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Call API to save order and trigger webhook
        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            console.log("Order API response:", result);
        } catch (error) {
            console.error("Order API failed:", error);
            // Continue to WhatsApp even if API fails
        }

        // 2. Generate WhatsApp message
        const message = generateWhatsAppMessage();

        // 3. Show toast notification
        toast({
            title: "Pesanan Dikirim!",
            description: "Anda akan diarahkan ke WhatsApp untuk konfirmasi.",
            variant: "success",
        });

        // 4. Small delay before opening WhatsApp
        setTimeout(() => {
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
        }, 500);
    };

    const isFormValid = formData.name && formData.phone && formData.productType && formData.occasion && formData.deliveryDate && formData.deliveryAddress;

    return (
        <div className="min-h-screen bg-[#2A121F] text-white relative overflow-hidden pb-24">
            {/* Header Navigation */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#2A121F]/80 backdrop-blur-xl border-b border-white/10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                    >
                        <ArrowRight className="w-5 h-5 rotate-180" />
                        <span className="text-sm font-medium">Kembali</span>
                    </button>
                    <h1 className="text-lg font-bold">Pesan Sekarang</h1>
                    <div className="w-20" /> {/* Spacer for centering */}
                </div>
            </header>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-[#200D18]/90 backdrop-blur-lg border-t border-white/10 pb-safe pt-2 z-50">
                <div className="flex justify-around items-center h-16">
                    <a href="/" className="flex flex-col items-center justify-center w-full h-full gap-1 text-white/50 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">home</span>
                        <span className="text-[10px] font-medium">Beranda</span>
                    </a>
                    <a href="/shop" className="flex flex-col items-center justify-center w-full h-full gap-1 text-white/50 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">storefront</span>
                        <span className="text-[10px] font-medium">Belanja</span>
                    </a>
                    <a href="/order" className="flex flex-col items-center justify-center w-full h-full gap-1 text-[#FF2E93] transition-colors">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>edit_note</span>
                        <span className="text-[10px] font-medium">Pesan</span>
                    </a>
                    <a href="/contact" className="flex flex-col items-center justify-center w-full h-full gap-1 text-white/50 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">call</span>
                        <span className="text-[10px] font-medium">Kontak</span>
                    </a>
                </div>
            </nav>

            {/* Animated Background Effects */}
            <GlowingOrbs />
            <FloatingPetals />
            <FloatingHearts />
            <DecorativeLines />

            {/* Hero Section */}
            <section className="relative pt-28 pb-8 px-4">
                <div className="container mx-auto relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        {/* Animated Icon */}
                        <div className="relative inline-block mb-6">
                            <div className="absolute inset-0 bg-[#FF2E93]/30 blur-3xl rounded-full animate-pulse-slow" />
                            <div className="relative w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#FF2E93] to-[#c026d3] flex items-center justify-center animate-bounce-slow shadow-lg shadow-[#FF2E93]/30">
                                <Flower2 className="w-10 h-10 text-white" />
                            </div>
                            {/* Sparkles around icon */}
                            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-[#FF2E93] animate-twinkle" />
                            <Sparkles className="absolute -bottom-1 -left-3 w-4 h-4 text-[#c026d3] animate-twinkle" style={{ animationDelay: '1s' }} />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
                            Pesan{" "}
                            <span className="relative">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E93] via-[#ff8cc6] to-[#c026d3]">
                                    Sekarang
                                </span>
                            </span>
                        </h1>
                        <p className="text-lg text-gray-300 max-w-xl mx-auto">
                            Isi form di bawah ini dan kami akan menghubungi Anda via
                            <span className="text-[#FF2E93] font-semibold"> WhatsApp</span> untuk konfirmasi pesanan.
                        </p>
                    </div>
                </div>
            </section>

            {/* Progress Steps */}
            <section className="py-6 px-4 relative z-10">
                <div className="container mx-auto max-w-3xl">
                    <div className="flex items-center justify-center gap-3 md:gap-6">
                        {["Pilih Bunga", "Detail Ucapan", "Pengiriman", "Konfirmasi"].map((step, idx) => {
                            // Calculate current step based on form progress
                            const step1Done = formData.productType && formData.occasion;
                            const step2Done = step1Done; // Detail ucapan is optional
                            const step3Done = step2Done && formData.deliveryDate && formData.deliveryAddress;
                            const step4Done = step3Done && formData.name && formData.phone;

                            let currentStep = 0;
                            if (step1Done) currentStep = 1;
                            if (step3Done) currentStep = 2;
                            if (step4Done) currentStep = 3;

                            const isActive = idx <= currentStep;
                            const isCurrent = idx === currentStep;

                            return (
                                <div key={idx} className="flex items-center gap-2 md:gap-3">
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                                        isCurrent
                                            ? "bg-gradient-to-br from-[#FF2E93] to-[#c026d3] text-white shadow-lg shadow-[#FF2E93]/30 scale-110"
                                            : isActive
                                                ? "bg-[#FF2E93]/30 text-white border border-[#FF2E93]/50"
                                                : "bg-white/10 text-white/50"
                                    )}>
                                        {isActive && idx < currentStep ? (
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            idx + 1
                                        )}
                                    </div>
                                    <span className={cn(
                                        "hidden md:block text-sm transition-colors",
                                        isActive ? "text-white" : "text-white/50"
                                    )}>{step}</span>
                                    {idx < 3 && (
                                        <div className={cn(
                                            "w-8 md:w-12 h-[2px] transition-all",
                                            idx < currentStep
                                                ? "bg-gradient-to-r from-[#FF2E93] to-[#c026d3]"
                                                : "bg-gradient-to-r from-white/20 to-transparent"
                                        )} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-8 px-4 relative z-10 pb-24">
                <div className="container mx-auto max-w-3xl">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Product Type Selection */}
                        <div className="group p-[2px] rounded-[1.5rem] bg-gradient-to-br from-[#FF2E93]/50 via-[#c026d3]/30 to-white/10 hover:from-[#FF2E93] hover:to-[#c026d3] transition-all duration-500">
                            <div className="p-6 rounded-[1.4rem] bg-[#200D18]/95 backdrop-blur-xl">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF2E93] to-[#c026d3] flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Flower2 className="w-4 h-4 text-white" />
                                    </div>
                                    Pilih Jenis Bunga
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {productTypes.map((type) => (
                                        <label
                                            key={type.value}
                                            className={cn(
                                                "relative p-5 rounded-xl border cursor-pointer transition-all duration-300 group/card",
                                                formData.productType === type.value
                                                    ? "bg-gradient-to-br from-[#FF2E93]/20 to-[#c026d3]/10 border-[#FF2E93] shadow-[0_0_30px_rgba(255,46,147,0.2)]"
                                                    : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
                                            )}
                                        >
                                            <input
                                                type="radio"
                                                name="productType"
                                                value={type.value}
                                                checked={formData.productType === type.value}
                                                onChange={handleChange}
                                                className="sr-only"
                                            />
                                            <div className="text-2xl mb-2">{type.icon}</div>
                                            <div className="font-bold text-white group-hover/card:text-[#FF2E93] transition-colors">{type.label}</div>
                                            <div className="text-xs text-gray-400 mt-1">{type.desc}</div>
                                            {formData.productType === type.value && (
                                                <div className="absolute top-3 right-3">
                                                    <div className="absolute inset-0 w-7 h-7 rounded-full bg-[#FF2E93] animate-ping opacity-50" />
                                                    <div className="relative w-7 h-7 rounded-full bg-gradient-to-br from-[#FF2E93] to-[#c026d3] flex items-center justify-center shadow-lg shadow-[#FF2E93]/50">
                                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            )}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Occasion Selection */}
                        <div className="group p-[2px] rounded-[1.5rem] bg-gradient-to-br from-white/20 to-white/5 hover:from-[#FF2E93]/30 hover:to-[#c026d3]/20 transition-all duration-500">
                            <div className="p-6 rounded-[1.4rem] bg-[#200D18]/95 backdrop-blur-xl">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF2E93]/20 to-[#c026d3]/20 border border-[#FF2E93]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Calendar className="w-4 h-4 text-[#FF2E93]" />
                                    </div>
                                    Keperluan / Acara
                                </h3>
                                <select
                                    name="occasion"
                                    value={formData.occasion}
                                    onChange={handleChange}
                                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#FF2E93] focus:outline-none focus:ring-2 focus:ring-[#FF2E93]/20 transition-all hover:border-white/30"
                                >
                                    <option value="" className="bg-[#200D18]">Pilih Acara...</option>
                                    {occasions.map((occ) => (
                                        <option key={occ} value={occ} className="bg-[#200D18]">{occ}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Message Details */}
                        <div className="group p-[2px] rounded-[1.5rem] bg-gradient-to-br from-white/20 to-white/5 hover:from-[#FF2E93]/30 hover:to-[#c026d3]/20 transition-all duration-500">
                            <div className="p-6 rounded-[1.4rem] bg-[#200D18]/95 backdrop-blur-xl space-y-4">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF2E93]/20 to-[#c026d3]/20 border border-[#FF2E93]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <FileText className="w-4 h-4 text-[#FF2E93]" />
                                    </div>
                                    Detail Ucapan
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Kepada (Nama Penerima)</label>
                                        <input
                                            type="text"
                                            name="recipientName"
                                            value={formData.recipientName}
                                            onChange={handleChange}
                                            placeholder="cth: Budi & Siti"
                                            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-[#FF2E93] focus:outline-none focus:ring-2 focus:ring-[#FF2E93]/20 transition-all hover:border-white/30"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Dari (Nama Pengirim)</label>
                                        <input
                                            type="text"
                                            name="senderName"
                                            value={formData.senderName}
                                            onChange={handleChange}
                                            placeholder="cth: Keluarga Besar"
                                            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-[#FF2E93] focus:outline-none focus:ring-2 focus:ring-[#FF2E93]/20 transition-all hover:border-white/30"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Pesan / Ucapan (opsional)</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Tulis pesan untuk kartu ucapan..."
                                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-[#FF2E93] focus:outline-none focus:ring-2 focus:ring-[#FF2E93]/20 transition-all resize-none hover:border-white/30"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Delivery Details */}
                        <div className="group p-[2px] rounded-[1.5rem] bg-gradient-to-br from-white/20 to-white/5 hover:from-[#FF2E93]/30 hover:to-[#c026d3]/20 transition-all duration-500">
                            <div className="p-6 rounded-[1.4rem] bg-[#200D18]/95 backdrop-blur-xl space-y-4">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF2E93]/20 to-[#c026d3]/20 border border-[#FF2E93]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <MapPin className="w-4 h-4 text-[#FF2E93]" />
                                    </div>
                                    Detail Pengiriman
                                </h3>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Tanggal Pengiriman *</label>
                                    <input
                                        type="date"
                                        name="deliveryDate"
                                        value={formData.deliveryDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#FF2E93] focus:outline-none focus:ring-2 focus:ring-[#FF2E93]/20 transition-all hover:border-white/30"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Alamat Pengiriman *</label>
                                    <textarea
                                        name="deliveryAddress"
                                        value={formData.deliveryAddress}
                                        onChange={handleChange}
                                        rows={2}
                                        required
                                        placeholder="Alamat lengkap tujuan pengiriman..."
                                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-[#FF2E93] focus:outline-none focus:ring-2 focus:ring-[#FF2E93]/20 transition-all resize-none hover:border-white/30"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Catatan Tambahan (opsional)</label>
                                    <input
                                        type="text"
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        placeholder="cth: Warna merah dominan, tanpa bunga kuning"
                                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-[#FF2E93] focus:outline-none focus:ring-2 focus:ring-[#FF2E93]/20 transition-all hover:border-white/30"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="group p-[2px] rounded-[1.5rem] bg-gradient-to-br from-[#FF2E93]/50 via-[#c026d3]/30 to-white/10 hover:from-[#FF2E93] hover:to-[#c026d3] transition-all duration-500">
                            <div className="p-6 rounded-[1.4rem] bg-[#200D18]/95 backdrop-blur-xl space-y-4">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF2E93] to-[#c026d3] flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    Data Pemesan
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Nama Anda *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Nama lengkap"
                                            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-[#FF2E93] focus:outline-none focus:ring-2 focus:ring-[#FF2E93]/20 transition-all hover:border-white/30"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">No. WhatsApp *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder="08xxxxxxxxxx"
                                            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-[#FF2E93] focus:outline-none focus:ring-2 focus:ring-[#FF2E93]/20 transition-all hover:border-white/30"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="relative">
                            {/* Glow effect behind button */}
                            {isFormValid && (
                                <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E93]/30 to-[#c026d3]/30 blur-2xl rounded-full" />
                            )}
                            <Button
                                type="submit"
                                disabled={!isFormValid}
                                className={cn(
                                    "relative w-full h-16 rounded-full text-lg font-bold shadow-lg transition-all overflow-hidden group/btn",
                                    isFormValid
                                        ? "bg-gradient-to-r from-[#FF2E93] to-[#c026d3] hover:from-[#E01D83] hover:to-[#a21caf] shadow-[#FF2E93]/30 hover:shadow-[#FF2E93]/50 hover:scale-[1.02]"
                                        : "bg-gray-700 cursor-not-allowed opacity-50"
                                )}
                            >
                                {/* Shimmer effect */}
                                {isFormValid && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                                )}
                                <span className="relative z-10 flex items-center justify-center">
                                    <MessageCircle className="w-5 h-5 mr-2" />
                                    Kirim via WhatsApp
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                </span>
                            </Button>
                        </div>

                        <p className="text-center text-sm text-gray-500">
                            Dengan menekan tombol di atas, Anda akan diarahkan ke WhatsApp untuk konfirmasi pesanan.
                        </p>
                    </form>
                </div>
            </section>
        </div>
    );
}
