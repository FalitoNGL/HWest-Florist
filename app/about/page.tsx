import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/mobile/bottom-nav";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tentang Kami | HWest Florist Batam",
    description: "HWest Florist adalah florist premium di Batam yang menyediakan papan bunga, buket, dan standing flower berkualitas tinggi untuk pernikahan, grand opening, dan momen spesial.",
    keywords: ["tentang hwest florist", "florist batam", "toko bunga batam", "papan bunga batam"],
    openGraph: {
        title: "Tentang HWest Florist Batam",
        description: "Florist premium di Batam dengan dedikasi menghadirkan keindahan bunga untuk setiap momen spesial.",
        type: "website",
        locale: "id_ID",
    },
    alternates: {
        canonical: "https://hwestflorist.shop/about",
    },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-[#2A121F] text-white pb-24">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-gradient-to-b from-[#2A121F] to-[#200D18] py-20 lg:py-32 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF2E93]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                            Cerita <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E93] to-[#c026d3]">Kami</span>
                        </h1>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                            Membawa keanggunan dan emosi di setiap momen spesial di **Batam**. HWest Florist berdedikasi melahirkan karya seni bunga premium yang berbicara lebih dari sekadar kata-kata.
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20 container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#200D18] border border-white/10 shadow-2xl">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                                {/* Placeholder for Shop/Team Image */}
                                <span className="font-serif italic text-2xl text-[#FF2E93]/50">Studio Kami</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold font-serif text-white">Dibuat dengan Hati</h2>
                            <p className="text-gray-300 leading-relaxed font-light">
                                Berdiri di Batam, HWest Florist berawal dari misi sederhana: meningkatkan standar hadiah bunga. Kami memahami bahwa bunga bukan sekadar dekorasi; mereka adalah pembawa pesan cinta, simpati, dan perayaan.
                            </p>
                            <p className="text-gray-300 leading-relaxed font-light">
                                Kami spesialis dalam **Papan Bunga Premium** untuk grand opening dan pernikahan, serta **Hand Bouquet** eksklusif dengan bunga-bunga tersegara. Setiap rangkaian didesain dengan estetika modern dan minimalis yang memancarkan kemewahan.
                            </p>
                            <div className="pt-4">
                                <Button asChild className="rounded-full px-8 bg-gradient-to-r from-[#FF2E93] to-[#c026d3] border-none text-white hover:opacity-90 transition-all shadow-[0_0_20px_rgba(255,46,147,0.3)] hover:scale-105">
                                    <Link href="/contact">Hubungi Kami <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-white/5 py-10 bg-[#1A0B14]">
                <div className="container mx-auto px-4 text-center text-gray-500">
                    <p>&copy; 2024 HWest Florist. Proudly serving Batam.</p>
                </div>
            </footer>
            <BottomNav />
        </div>
    );
}
