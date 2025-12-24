import { getOrders, getAnalytics } from "@/app/actions/admin";
import { format } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function AdminDashboard() {
    const { data: orders } = await getOrders();
    const { data: analytics } = await getAnalytics();

    // Fallback data
    const safeOrders = orders || [];
    const revenue = analytics?.revenue || 0;
    const ordersCount = analytics?.ordersCount || 0;

    // Status Counts
    const pendingCount = safeOrders.filter(o => o.status === 'PENDING_PAYMENT').length;
    const arrangingCount = safeOrders.filter(o => ['IN_PRODUCTION', 'DESIGN_DRAFT', 'WAITING_APPROVAL'].includes(o.status)).length;
    const onRouteCount = safeOrders.filter(o => ['ON_DELIVERY', 'READY_TO_SHIP'].includes(o.status)).length;
    const deliveredCount = safeOrders.filter(o => o.status === 'COMPLETED').length;

    const recentOrders = safeOrders.slice(0, 10);

    return (
        <div className="flex flex-col space-y-8 font-display">
            {/* Header (Desktop & Mobile Adaptive) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                        Overview
                        <span className="hidden sm:inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                            Live Data
                        </span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        Welcome back, HWest Admin.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden md:block relative w-64">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
                        <input
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-none bg-white dark:bg-slate-800 shadow-sm text-sm font-medium focus:ring-2 focus:ring-primary/20 placeholder-gray-400"
                            placeholder="Search orders..."
                            type="text"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-all">
                        <span className="material-symbols-outlined text-lg">calendar_today</span>
                        <span>{format(new Date(), "MMM d, yyyy")}</span>
                    </button>
                    <Link href="/admin/products/new" className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-primary text-slate-900 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all">
                        <span className="material-symbols-outlined text-lg">add</span>
                        New Product
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Revenue Card */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_4px_12px_rgba(0,0,0,0.06)] relative overflow-hidden group">
                    <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-br from-green-50 to-transparent dark:from-green-900/10 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110 pointer-events-none"></div>
                    <div className="relative z-10">
                        <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold flex items-center gap-2">Total Revenue</span>
                        <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(revenue)}
                        </h3>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm relative z-10">
                        <span className="flex items-center text-green-700 dark:text-green-400 font-bold bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-md">
                            <span className="material-symbols-outlined text-base mr-0.5">trending_up</span> +5%
                        </span>
                        <span className="text-slate-400 dark:text-slate-500 text-xs font-medium">vs last month</span>
                    </div>
                </div>

                {/* Orders Card */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_4px_12px_rgba(0,0,0,0.06)] relative overflow-hidden group">
                    <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/10 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110 pointer-events-none"></div>
                    <div className="relative z-10">
                        <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold">Total Orders</span>
                        <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">{ordersCount}</h3>
                    </div>
                    <div className="mt-4 relative z-10">
                        <div className="flex justify-between text-xs font-semibold mb-1.5">
                            <span className="text-slate-700 dark:text-slate-300">Completion Rate</span>
                            <span className="text-blue-600 dark:text-blue-400 font-bold">{ordersCount > 0 ? Math.round((deliveredCount / ordersCount) * 100) : 0}%</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${ordersCount > 0 ? (deliveredCount / ordersCount) * 100 : 0}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* On Route Card */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_4px_12px_rgba(0,0,0,0.06)] relative overflow-hidden group">
                    <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-br from-orange-50 to-transparent dark:from-orange-900/10 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110 pointer-events-none"></div>
                    <div className="relative z-10">
                        <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold">On Route</span>
                        <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
                            {onRouteCount} <span className="text-base font-medium text-slate-400">orders</span>
                        </h3>
                    </div>
                    <div className="p-2 absolute right-4 bottom-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400">
                        <span className="material-symbols-outlined">local_shipping</span>
                    </div>
                </div>

                {/* In Production Card */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_4px_12px_rgba(0,0,0,0.06)] relative overflow-hidden group">
                    <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-br from-purple-50 to-transparent dark:from-purple-900/10 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110 pointer-events-none"></div>
                    <div className="relative z-10">
                        <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold">In Production</span>
                        <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
                            {arrangingCount} <span className="text-base font-medium text-slate-400">orders</span>
                        </h3>
                    </div>
                    <div className="mt-4 flex gap-2 relative z-10">
                        <div className="text-center flex-1 bg-gray-50 dark:bg-slate-700/50 rounded-lg p-1">
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Draft</div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white">{safeOrders.filter(o => o.status === 'DESIGN_DRAFT').length}</div>
                        </div>
                        <div className="text-center flex-1 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-1 border border-purple-100 dark:border-purple-800">
                            <div className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase">Active</div>
                            <div className="text-sm font-bold text-purple-700 dark:text-purple-300">{safeOrders.filter(o => o.status === 'IN_PRODUCTION').length}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Recent Orders</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Latest transactions from your store.</p>
                    </div>
                    <Link href="/admin/orders" className="text-sm font-semibold text-primary hover:text-green-600 transition-colors">
                        View All Orders
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                    <td className="px-6 py-4 font-mono font-medium text-slate-900 dark:text-white">
                                        #{order.id.slice(0, 8)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-slate-900 dark:text-white">{order.recipientName}</span>
                                            <span className="text-xs text-slate-500">{order.recipientPhone}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border",
                                            order.status === 'COMPLETED' ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800" :
                                                order.status === 'PENDING_PAYMENT' ? "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800" :
                                                    "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
                                        )}>
                                            {order.status.replace(/_/g, " ")}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                        {format(new Date(order.createdAt), "MMM d, h:mm a")}
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-white">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(order.totalAmount)}
                                    </td>
                                </tr>
                            ))}
                            {recentOrders.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                        No recent orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Floating Mobile FAB (Keep for mobile) */}
            <Link
                href="/admin/products/new"
                className="fixed bottom-24 right-4 z-40 size-14 bg-primary rounded-full shadow-lg shadow-primary/40 flex items-center justify-center text-slate-900 md:hidden"
            >
                <span className="material-symbols-outlined text-3xl">add</span>
            </Link>
        </div>
    );
}
