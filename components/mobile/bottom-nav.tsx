'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { name: "Beranda", href: "/", icon: "home" },
        { name: "Belanja", href: "/shop", icon: "storefront" },
        { name: "Kontak", href: "/contact", icon: "call" },
        { name: "Akun", href: "/login", icon: "person" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-[#200D18]/90 backdrop-blur-lg border-t border-white/10 pb-safe pt-2 z-50">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${isActive
                                ? "text-[#FF2E93]"
                                : "text-white/50 hover:text-white"
                                }`}
                        >
                            <span
                                className={`material-symbols-outlined ${isActive ? 'filled' : ''}`}
                                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                            >
                                {item.icon}
                            </span>
                            <span className="text-[10px] font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
            {/* Safe area spacing for modern phones */}
            <div className="h-1 w-full"></div>
        </nav>
    );
}
