"use client";

import Image from "next/image";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#2A121F]">
            <div className="flex flex-col items-center space-y-6">
                {/* Logo */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E93] to-[#c026d3] rounded-full blur-xl opacity-50 animate-pulse" />
                    <div className="relative w-20 h-20 rounded-full bg-[#2A121F] border-2 border-white/10 flex items-center justify-center overflow-hidden">
                        <Image
                            src="/icon-192.png"
                            alt="HWest Florist"
                            width={64}
                            height={64}
                            className="w-16 h-16 object-contain"
                        />
                    </div>
                </div>

                {/* Loading Animation */}
                <div className="flex flex-col items-center space-y-3">
                    {/* Animated Dots */}
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-[#FF2E93] to-[#c026d3] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-3 h-3 bg-gradient-to-r from-[#FF2E93] to-[#c026d3] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-3 h-3 bg-gradient-to-r from-[#FF2E93] to-[#c026d3] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>

                    {/* Loading Text */}
                    <p className="text-white/60 text-sm font-medium animate-pulse">
                        Memuat...
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#FF2E93] to-[#c026d3] rounded-full animate-loading-bar" />
                </div>
            </div>

            {/* Custom Animation Style */}
            <style jsx>{`
                @keyframes loading-bar {
                    0% { width: 0%; transform: translateX(0); }
                    50% { width: 70%; }
                    100% { width: 100%; transform: translateX(0); }
                }
                .animate-loading-bar {
                    animation: loading-bar 1.5s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
