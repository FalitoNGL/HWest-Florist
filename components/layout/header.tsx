import Link from "next/link";
import Image from "next/image";

export function Header() {
    return (
        <header className="sticky top-0 z-50 flex items-center bg-[#2A121F]/80 backdrop-blur-xl p-4 justify-between border-b border-white/10 shadow-sm transition-colors duration-200 font-display">
            <Link href="/" className="flex items-center">
                <Image
                    src="/logo-dark.png"
                    alt="HWest Florist"
                    width={180}
                    height={50}
                    className="h-10 w-auto"
                    priority
                />
            </Link>

            {/* Desktop Nav - Pill Style */}
            <nav className="hidden md:flex items-center gap-8 bg-black/30 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 shadow-lg hover:border-white/20 transition-colors">
                <Link href="/shop" className="text-sm font-medium text-white/90 hover:text-[#FF2E93] transition-colors">
                    Belanja
                </Link>
                <Link href="/track" className="text-sm font-medium text-white/90 hover:text-[#FF2E93] transition-colors">
                    Lacak Pesanan
                </Link>
                <Link href="/about" className="text-sm font-medium text-white/90 hover:text-[#FF2E93] transition-colors">
                    Tentang Kami
                </Link>
            </nav>

            {/* Right Side - Order Button */}
            <Link
                href="/order"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FF2E93] to-[#c026d3] text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-[#FF2E93]/20"
            >
                Pesan Sekarang
            </Link>
        </header>
    );
}
