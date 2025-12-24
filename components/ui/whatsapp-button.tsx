"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function WhatsAppButton() {
    const [isOpen, setIsOpen] = useState(false);
    const whatsappNumber = "6282169512800";
    const whatsappMessage = encodeURIComponent("Halo HWest Florist, saya ingin bertanya tentang...");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* Tooltip/Mini Card */}
            <div
                className={cn(
                    "bg-white rounded-2xl shadow-2xl p-4 max-w-[280px] transition-all duration-300 origin-bottom-right",
                    isOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-75 translate-y-4 pointer-events-none"
                )}
            >
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-sm">HWest Florist</h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                            Online sekarang! Biasanya membalas dalam beberapa menit.
                        </p>
                    </div>
                </div>
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-bold hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/30"
                >
                    <MessageCircle className="w-4 h-4" />
                    Mulai Chat
                </a>
            </div>

            {/* Main Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "group relative w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110",
                    isOpen
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700"
                )}
            >
                {/* Pulse Animation */}
                {!isOpen && (
                    <>
                        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
                        <span className="absolute inset-0 rounded-full bg-green-500 animate-pulse opacity-20" />
                    </>
                )}

                {/* Icon */}
                <span className="relative z-10 flex items-center justify-center w-full h-full">
                    {isOpen ? (
                        <X className="w-6 h-6 text-white" />
                    ) : (
                        <MessageCircle className="w-6 h-6 text-white" />
                    )}
                </span>
            </button>
        </div>
    );
}
