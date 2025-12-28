'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function AdminBottomNav() {
    const pathname = usePathname();

    const navItems = [
        { name: "Dasbor", href: "/admin/dashboard", icon: "dashboard", activePath: "/admin/dashboard" },
        { name: "Pesanan", href: "/admin/orders", icon: "local_florist", activePath: "/admin/orders" },
        { name: "Produk", href: "/admin/products", icon: "inventory_2", activePath: "/admin/products" },
        { name: "Pengaturan", href: "/admin/settings", icon: "settings", activePath: "/admin/settings" },
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 pb-safe pt-2 z-50 md:hidden">
            <div className="flex justify-around items-end h-16 pb-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.activePath !== '/admin/dashboard' && pathname.startsWith(item.activePath));
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex flex-col items-center gap-1 w-16 group"
                        >
                            <span className={cn(
                                "material-symbols-outlined transition-transform",
                                isActive ? "text-primary font-bold scale-110" : "text-gray-400 group-hover:text-primary"
                            )}>
                                {item.icon}
                            </span>
                            <span className={cn(
                                "text-[10px] font-medium transition-colors",
                                isActive ? "text-slate-900 dark:text-white font-bold" : "text-gray-500 dark:text-gray-400 group-hover:text-slate-900 dark:group-hover:text-white"
                            )}>
                                {item.name}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}
