import { getOrders, getAnalytics } from "@/app/actions/admin";
import { DashboardClient } from "@/components/admin/dashboard-client";

export default async function AdminDashboard() {
    const { data: orders } = await getOrders();
    const { data: analytics } = await getAnalytics();

    // Fallback data
    const safeOrders = orders || [];
    const revenue = analytics?.revenue || 0;
    const ordersCount = analytics?.ordersCount || 0;

    return (
        <DashboardClient
            orders={safeOrders.map(o => ({
                ...o,
                createdAt: o.createdAt.toISOString(),
            }))}
            revenue={revenue}
            ordersCount={ordersCount}
        />
    );
}
