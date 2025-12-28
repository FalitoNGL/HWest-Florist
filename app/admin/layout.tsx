import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminBottomNav } from "@/components/mobile/admin-bottom-nav";
import Link from "next/link";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-50">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <AdminSidebar />
            </div>

            {/* Mobile Header */}
            <div className="md:hidden sticky top-0 z-40 bg-slate-900 border-b border-slate-800">
                <div className="flex items-center justify-between px-4 h-14">
                    <Link href="/admin/dashboard" className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                            <span className="font-bold text-slate-900 text-sm">H</span>
                        </div>
                        <span className="text-lg font-bold tracking-tight text-white">HWest Admin</span>
                    </Link>
                    <Link href="/" className="text-slate-400 text-sm hover:text-white transition-colors">
                        Lihat Toko
                    </Link>
                </div>
            </div>

            <div className="flex flex-col md:pl-64 min-h-screen">
                <main className="flex-1 pb-24 md:pb-6 md:p-6">
                    {children}
                </main>
            </div>

            <AdminBottomNav />
        </div>
    );
}
