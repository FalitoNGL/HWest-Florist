import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminBottomNav } from "@/components/mobile/admin-bottom-nav";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-50">
            <div className="hidden md:block">
                <AdminSidebar />
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
