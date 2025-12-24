"use client";

import Link from "next/link";
import { MapPin, Phone, Instagram, Facebook, ArrowRight, Clock, MessageCircle, Sparkles, Flower2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

// Scroll Reveal Hook
function useScrollReveal() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return { ref, isVisible };
}

// Reveal Component
const Reveal = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
    const { ref, isVisible } = useScrollReveal();
    return (
        <div
            ref={ref}
            className={cn(
                "transition-all duration-1000 ease-out transform",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
                className
            )}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

// Animated Floating Petals
const FloatingPetals = () => {
    const petals = [...Array(15)].map((_, i) => ({
        id: i,
        size: 10 + Math.random() * 20,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 15 + Math.random() * 15,
        rotation: Math.random() * 360,
    }));

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
                        <path
                            fill="currentColor"
                            d="M2 12C2 10.5 3.5 9 5.5 9C7.5 9 9 10.5 10 12C9 13.5 7.5 15 5.5 15C3.5 15 2 13.5 2 12Z"
                        />
                        <path
                            fill="currentColor"
                            d="M22 12C22 13.5 20.5 15 18.5 15C16.5 15 15 13.5 14 12C15 10.5 16.5 9 18.5 9C20.5 9 22 10.5 22 12Z"
                        />
                    </svg>
                </div>
            ))}
        </div>
    );
};

// Animated Hearts
const FloatingHearts = () => {
    const hearts = [...Array(8)].map((_, i) => ({
        id: i,
        size: 12 + Math.random() * 16,
        left: 10 + Math.random() * 80,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 8,
    }));

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

// Glowing Orbs
const GlowingOrbs = () => (
    <>
        <div className="absolute top-20 left-[10%] w-32 h-32 bg-[#FF2E93]/20 rounded-full blur-[80px] animate-pulse-slow" />
        <div className="absolute top-40 right-[15%] w-40 h-40 bg-[#c026d3]/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-[20%] w-48 h-48 bg-[#FF2E93]/15 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-20 right-[10%] w-36 h-36 bg-[#c026d3]/15 rounded-full blur-[90px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
    </>
);

// Decorative Lines
const DecorativeLines = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] -left-1/4 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-[#FF2E93]/20 to-transparent rotate-12" />
        <div className="absolute top-[60%] -left-1/4 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-[#c026d3]/20 to-transparent -rotate-6" />
        <div className="absolute top-[80%] -left-1/4 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-[#FF2E93]/10 to-transparent rotate-3" />
    </div>
);

export default function ContactPage() {
    const whatsappNumber = "6282169512800";
    const whatsappMessage = encodeURIComponent("Halo HWest Florist, saya ingin bertanya tentang...");

    const socialLinks = [
        {
            name: "Instagram",
            handle: "@hwest_florist",
            description: "Lihat koleksi terbaru kami",
            href: "https://www.instagram.com/hwest_florist/",
            icon: Instagram,
            bgGradient: "from-pink-500/20 to-purple-500/20",
            iconColor: "text-pink-400",
            hoverGlow: "hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]",
        },
        {
            name: "Facebook",
            handle: "HWest Florist",
            description: "Ikuti update & promo menarik",
            href: "https://www.facebook.com/eriano.bagsshop",
            icon: Facebook,
            bgGradient: "from-blue-500/20 to-blue-600/20",
            iconColor: "text-blue-400",
            hoverGlow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
        },
    ];

    return (
        <div className="min-h-screen bg-[#2A121F] text-white relative overflow-hidden">
            {/* Animated Background Effects */}
            <GlowingOrbs />
            <FloatingPetals />
            <FloatingHearts />
            <DecorativeLines />

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 px-4">
                <div className="container mx-auto relative z-10">
                    <Reveal className="text-center max-w-3xl mx-auto">
                        {/* Animated Flower Icon */}
                        <div className="relative inline-block mb-8">
                            <div className="absolute inset-0 bg-[#FF2E93]/20 blur-3xl rounded-full animate-pulse-slow" />
                            <div className="relative w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#FF2E93] to-[#c026d3] flex items-center justify-center animate-bounce-slow">
                                <Flower2 className="w-10 h-10 text-white" />
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                            Hubungi{" "}
                            <span className="relative">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E93] via-[#ff8cc6] to-[#c026d3] animate-gradient bg-300%">
                                    HWest
                                </span>
                                <Sparkles className="absolute -top-2 -right-6 w-6 h-6 text-[#FF2E93] animate-twinkle" />
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                            Ada pertanyaan tentang pesanan atau ingin konsultasi bunga yang tepat untuk momen spesial Anda?
                            <span className="text-[#FF2E93]"> Tim kami siap membantu!</span>
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Quick Contact Buttons */}
            <section className="py-8 px-4 relative z-10">
                <div className="container mx-auto">
                    <Reveal delay={100}>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold shadow-lg shadow-green-500/25 hover:shadow-green-500/50 hover:scale-105 transition-all duration-300 overflow-hidden"
                            >
                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                <MessageCircle className="w-5 h-5 relative z-10 group-hover:animate-wiggle" />
                                <span className="relative z-10">Chat WhatsApp</span>
                                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="tel:+6282169512800"
                                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 hover:border-[#FF2E93]/50 hover:scale-105 transition-all duration-300 backdrop-blur-sm overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF2E93]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                <Phone className="w-5 h-5 relative z-10 group-hover:animate-ring" />
                                <span className="relative z-10">+62 821-6951-2800</span>
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Main Content Grid */}
            <section className="py-16 px-4 relative z-10">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                        {/* Left Column - Social & Info */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Social Media Cards */}
                            <Reveal delay={150}>
                                <div className="group p-[2px] rounded-[2rem] bg-gradient-to-br from-[#FF2E93]/50 via-[#c026d3]/30 to-white/10 hover:from-[#FF2E93] hover:to-[#c026d3] transition-all duration-500">
                                    <div className="p-8 rounded-[1.9rem] bg-[#200D18]/95 backdrop-blur-xl">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="relative">
                                                <Sparkles className="w-5 h-5 text-[#FF2E93] animate-twinkle" />
                                            </div>
                                            <h3 className="text-lg font-bold">Ikuti Kami</h3>
                                        </div>
                                        <div className="space-y-4">
                                            {socialLinks.map((social, idx) => (
                                                <a
                                                    key={idx}
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={cn(
                                                        "group/item relative flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300",
                                                        social.hoverGlow
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
                                                        social.bgGradient,
                                                        "border border-white/10 group-hover/item:scale-110 group-hover/item:rotate-6 transition-all duration-300"
                                                    )}>
                                                        <social.icon className={cn("w-6 h-6", social.iconColor)} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-bold text-white group-hover/item:text-[#FF2E93] transition-colors">{social.name}</div>
                                                        <div className="text-sm text-gray-400 truncate">{social.handle}</div>
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 text-white/30 group-hover/item:text-[#FF2E93] group-hover/item:translate-x-1 transition-all flex-shrink-0" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Store Info Card */}
                            <Reveal delay={200}>
                                <div className="group p-[2px] rounded-[2rem] bg-gradient-to-br from-[#FF2E93]/30 to-[#c026d3]/30 hover:from-[#FF2E93]/60 hover:to-[#c026d3]/60 transition-all duration-500">
                                    <div className="p-8 rounded-[1.9rem] bg-[#200D18]/95 backdrop-blur-xl">
                                        <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF2E93] to-[#c026d3] flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                                <MapPin className="w-5 h-5 text-white" />
                                            </div>
                                            Alamat Toko
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed mb-6">
                                            Ruko Grand Batam, Blok B No. 12<br />
                                            Batam, Kepulauan Riau<br />
                                            Indonesia
                                        </p>
                                        <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#FF2E93]/30 transition-colors">
                                            <div className="relative">
                                                <Clock className="w-5 h-5 text-[#FF2E93]" />
                                                <div className="absolute inset-0 bg-[#FF2E93]/30 blur-lg rounded-full animate-pulse-slow" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-white">Jam Operasional</div>
                                                <div className="text-sm text-gray-400">Setiap Hari: 08:00 - 20:00 WIB</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        {/* Right Column - Map */}
                        <div className="lg:col-span-3">
                            <Reveal delay={250}>
                                <div className="group p-[2px] rounded-[2rem] bg-gradient-to-br from-white/20 to-white/5 hover:from-[#FF2E93]/50 hover:to-[#c026d3]/30 transition-all duration-500 h-full">
                                    <div className="rounded-[1.9rem] overflow-hidden bg-[#200D18]/95 backdrop-blur-xl h-full flex flex-col">
                                        <div className="relative flex-1 min-h-[400px] lg:min-h-[500px]">
                                            {/* Map Overlay Gradient */}
                                            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#200D18] via-transparent to-transparent opacity-30" />
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.1651010537103!2d103.96205267482874!3d1.0368035989532196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d98dab4d3efbc5%3A0xd93010d6d865da58!2sHWest%20Florist!5e0!3m2!1sid!2sid!4v1766548854808!5m2!1sid!2sid"
                                                className="w-full h-full absolute inset-0"
                                                style={{ border: 0 }}
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <a
                                                href="https://maps.google.com/?q=HWest+Florist+Batam"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group/btn relative flex items-center justify-center gap-3 w-full px-6 py-4 rounded-xl bg-gradient-to-r from-[#FF2E93] to-[#c026d3] text-white font-bold hover:shadow-lg hover:shadow-[#FF2E93]/40 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                                                <MapPin className="w-5 h-5 relative z-10" />
                                                <span className="relative z-10">Buka di Google Maps</span>
                                                <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA Section */}
            <section className="py-20 px-4 relative z-10">
                <div className="container mx-auto">
                    <Reveal delay={300}>
                        <div className="relative p-12 md:p-16 rounded-[2.5rem] overflow-hidden group">
                            {/* Animated Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#FF2E93]/20 via-[#c026d3]/10 to-transparent group-hover:from-[#FF2E93]/30 group-hover:via-[#c026d3]/20 transition-all duration-500" />
                            <div className="absolute inset-0 border border-white/10 rounded-[2.5rem] group-hover:border-[#FF2E93]/30 transition-colors duration-500" />

                            {/* Animated Orbs */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF2E93]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#FF2E93]/30 transition-colors duration-500" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#c026d3]/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3 group-hover:bg-[#c026d3]/30 transition-colors duration-500" />

                            {/* Floating Decorations */}
                            <Flower2 className="absolute top-8 left-8 w-8 h-8 text-[#FF2E93]/20 animate-float" style={{ animationDelay: '0s' }} />
                            <Heart className="absolute top-12 right-12 w-6 h-6 text-[#FF2E93]/20 fill-[#FF2E93]/10 animate-float" style={{ animationDelay: '1s' }} />
                            <Sparkles className="absolute bottom-8 right-8 w-6 h-6 text-[#FF2E93]/20 animate-twinkle" />

                            {/* Content */}
                            <div className="relative z-10 text-center max-w-2xl mx-auto">
                                <h2 className="text-3xl md:text-5xl font-black mb-6">
                                    Siap Membuat Momen{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E93] to-[#c026d3]">
                                        Spesial?
                                    </span>
                                </h2>
                                <p className="text-lg text-gray-400 mb-10">
                                    Hubungi kami sekarang untuk konsultasi gratis dan temukan bunga yang sempurna untuk setiap momen!
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="/shop">
                                        <Button className="group/shop w-full sm:w-auto h-14 px-10 rounded-full text-lg font-bold bg-gradient-to-r from-[#FF2E93] to-[#c026d3] hover:from-[#E01D83] hover:to-[#a21caf] shadow-lg shadow-[#FF2E93]/30 hover:shadow-[#FF2E93]/50 hover:scale-105 transition-all overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/shop:translate-x-full transition-transform duration-700" />
                                            <span className="relative z-10 flex items-center">
                                                Lihat Katalog
                                                <ArrowRight className="ml-2 w-5 h-5 group-hover/shop:translate-x-1 transition-transform" />
                                            </span>
                                        </Button>
                                    </Link>
                                    <a
                                        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button variant="outline" className="group/wa w-full sm:w-auto h-14 px-10 rounded-full text-lg font-bold border-white/20 bg-white/5 hover:bg-white/10 hover:border-[#FF2E93]/50 backdrop-blur-sm transition-all overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF2E93]/10 to-transparent -translate-x-full group-hover/wa:translate-x-full transition-transform duration-700" />
                                            <MessageCircle className="mr-2 w-5 h-5 relative z-10 group-hover/wa:animate-wiggle" />
                                            <span className="relative z-10">Chat WhatsApp</span>
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
