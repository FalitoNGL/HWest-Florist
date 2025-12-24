"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const FloatingWhatsApp = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show button after scrolling down a bit to not clutter initial view
        const handleScroll = () => {
            setIsVisible(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const phoneNumber = "6282169512800"; // Based on footer info
    const message = "Hello HWest Florist, I would like to order...";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-[0_4px_12px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_16px_rgba(37,211,102,0.6)] hover:scale-110 transition-all duration-300 transform cursor-pointer group",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
            )}
            aria-label="Chat on WhatsApp"
        >
            {/* Pulse Effect */}
            <span className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping group-hover:animate-none"></span>

            {/* Icon (Using Lucide MessageCircle as generic chat, or could be SVG) */}
            <MessageCircle className="w-8 h-8 md:w-9 md:h-9 fill-current" />

            {/* Tooltip on Desktop */}
            <span className="absolute right-full mr-4 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden md:block">
                Chat Kami
            </span>
        </a>
    );
};
