"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Settings, ShoppingBag, LogOut, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function AdminSidebar() {
    const pathname = usePathname();

    const routes = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            href: "/admin/dashboard",
            active: pathname === "/admin/dashboard",
        },
        {
            label: "Orders",
            icon: ShoppingBag,
            href: "/admin/orders",
            active: pathname.startsWith("/admin/orders"),
        },
        {
            label: "Products",
            icon: Package,
            href: "/admin/products",
            active: pathname.startsWith("/admin/products"),
        },
        {
            label: "Settings",
            icon: Settings,
            href: "/admin/settings",
            active: pathname === "/admin/settings",
        },
    ];

    return (
        <aside className="hidden md:flex h-full w-64 flex-col fixed inset-y-0 z-50 bg-slate-900 text-white border-r border-slate-800">
            {/* Logo */}
            <div className="flex h-16 items-center px-6 border-b border-slate-800">
                <Link href="/admin/dashboard" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="font-bold text-slate-900">H</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight">HWest Admin</span>
                </Link>
            </div>

            {/* Nav Items */}
            <div className="flex-1 flex flex-col overflow-y-auto py-4">
                <nav className="space-y-1 px-3">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all group relative",
                                route.active
                                    ? "text-primary bg-slate-800"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                            )}
                        >
                            <route.icon className={cn("h-5 w-5", route.active ? "text-primary" : "text-slate-400 group-hover:text-white")} />
                            {route.label}
                            {route.active && (
                                <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary rounded-l-full" />
                            )}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Footer Items */}
            <div className="mt-auto p-4 border-t border-slate-800 space-y-2">
                <Link href="/">
                    <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800">
                        <Store className="mr-2 h-4 w-4" />
                        View Store
                    </Button>
                </Link>
                <form action="/auth/signout" method="post">
                    <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log Out
                    </Button>
                </form>
            </div>
        </aside>
    );
}
