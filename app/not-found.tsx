"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, ShoppingBag, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#2A121F] text-center px-4 font-display relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#FF2E93]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-[#c026d3]/10 rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Logo */}
                <div className="mb-8">
                    <Image
                        src="/icon-192.png"
                        alt="HWest Florist"
                        width={80}
                        height={80}
                        className="w-20 h-20 opacity-50"
                    />
                </div>

                {/* 404 Number */}
                <div className="relative mb-6">
                    <h1 className="text-[150px] md:text-[200px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl">🥀</span>
                    </div>
                </div>

                {/* Message */}
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Halaman Tidak Ditemukan
                </h2>
                <p className="text-white/60 text-base max-w-md mb-8">
                    Maaf, halaman yang Anda cari tidak ada atau sudah dipindahkan.
                    Mari kembali ke bunga-bunga cantik kami.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                    <Link
                        href="/"
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF2E93] to-[#c026d3] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-[#FF2E93]/20"
                    >
                        <Home className="w-4 h-4" />
                        Beranda
                    </Link>
                    <Link
                        href="/shop"
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors border border-white/10"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        Lihat Katalog
                    </Link>
                </div>

                {/* Back Link */}
                <button
                    onClick={() => window.history.back()}
                    className="mt-6 flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke halaman sebelumnya
                </button>

                {/* Search Suggestion */}
                <div className="mt-12 p-4 rounded-2xl bg-white/5 border border-white/10 max-w-sm w-full">
                    <p className="text-white/40 text-xs mb-3">Atau cari produk yang Anda inginkan:</p>
                    <Link
                        href="/shop"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20 transition-colors"
                    >
                        <Search className="w-4 h-4" />
                        <span className="text-sm">Cari buket, papan bunga...</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
