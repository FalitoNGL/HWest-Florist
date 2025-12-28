"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Search, Plus, Calendar, ChevronRight, Clock, CheckCircle2, Truck, Palette } from "lucide-react";

interface Order {
    id: string;
    recipientName: string;
    recipientPhone: string;
    status: string;
    totalAmount: number;
    createdAt: string | Date;
}

interface DashboardClientProps {
    orders: Order[];
    revenue: number;
    ordersCount: number;
}

const statusLabels: Record<string, string> = {
    'PENDING_PAYMENT': 'Menunggu Bayar',
    'DESIGN_DRAFT': 'Draft Desain',
    'WAITING_APPROVAL': 'Menunggu Persetujuan',
    'IN_PRODUCTION': 'Dalam Produksi',
    'READY_TO_SHIP': 'Siap Kirim',
    'ON_DELIVERY': 'Sedang Dikirim',
    'COMPLETED': 'Selesai',
    'CANCELLED': 'Dibatalkan',
};

export function DashboardClient({ orders, revenue, ordersCount }: DashboardClientProps) {
    const [searchQuery, setSearchQuery] = useState("");

    // Status Counts
    const pendingCount = orders.filter(o => o.status === 'PENDING_PAYMENT').length;
    const arrangingCount = orders.filter(o => ['IN_PRODUCTION', 'DESIGN_DRAFT', 'WAITING_APPROVAL'].includes(o.status)).length;
    const onRouteCount = orders.filter(o => ['ON_DELIVERY', 'READY_TO_SHIP'].includes(o.status)).length;
    const deliveredCount = orders.filter(o => o.status === 'COMPLETED').length;

    // Filtered orders based on search
    const filteredOrders = useMemo(() => {
        if (!searchQuery) return orders.slice(0, 10);
        const query = searchQuery.toLowerCase();
        return orders.filter(o =>
            o.recipientName.toLowerCase().includes(query) ||
            o.recipientPhone.includes(query) ||
            o.id.toLowerCase().includes(query)
        ).slice(0, 10);
    }, [orders, searchQuery]);

    return (
        <div className="flex flex-col space-y-6 md:space-y-8 font-display p-4 md:p-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                        Ringkasan
                        <span className="hidden sm:inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                            Live
                        </span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium text-sm md:text-base">
                        Selamat datang, Admin HWest.
                    </p>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                    {/* Search - visible on all screens */}
                    <div className="relative flex-1 md:flex-none md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-none bg-white dark:bg-slate-800 shadow-sm text-sm font-medium focus:ring-2 focus:ring-primary/20 placeholder-gray-400"
                            placeholder="Cari pesanan..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-all">
                        <Calendar className="w-4 h-4" />
                        <span>{format(new Date(), "d MMM yyyy", { locale: id })}</span>
                    </button>
                    <Link href="/admin/products/new" className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-primary text-slate-900 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all">
                        <Plus className="w-4 h-4" />
                        Produk Baru
                    </Link>
                </div>
            </div>

            {/* Quick Stats Cards - 2 columns on mobile, 4 on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                {/* Revenue Card */}
                <div className="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 h-24 w-24 md:h-32 md:w-32 bg-gradient-to-br from-green-50 to-transparent dark:from-green-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110 pointer-events-none" />
                    <div className="relative z-10">
                        <span className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-semibold">Total Pendapatan</span>
                        <h3 className="text-xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 md:mt-2">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(revenue)}
                        </h3>
                    </div>
                    <div className="mt-2 md:mt-4 flex items-center gap-2 text-xs md:text-sm relative z-10">
                        <span className="flex items-center text-green-700 dark:text-green-400 font-bold bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-md">
                            <ChevronRight className="w-3 h-3 rotate-[-90deg]" /> +5%
                        </span>
                        <span className="text-slate-400 dark:text-slate-500 text-[10px] md:text-xs font-medium hidden md:block">vs bulan lalu</span>
                    </div>
                </div>

                {/* Orders Card */}
                <div className="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 h-24 w-24 md:h-32 md:w-32 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110 pointer-events-none" />
                    <div className="relative z-10">
                        <span className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-semibold">Total Pesanan</span>
                        <h3 className="text-xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 md:mt-2">{ordersCount}</h3>
                    </div>
                    <div className="mt-2 md:mt-4 relative z-10">
                        <div className="flex justify-between text-[10px] md:text-xs font-semibold mb-1">
                            <span className="text-slate-700 dark:text-slate-300">Selesai</span>
                            <span className="text-blue-600 dark:text-blue-400 font-bold">{ordersCount > 0 ? Math.round((deliveredCount / ordersCount) * 100) : 0}%</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${ordersCount > 0 ? (deliveredCount / ordersCount) * 100 : 0}%` }} />
                        </div>
                    </div>
                </div>

                {/* On Route Card */}
                <div className="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 h-24 w-24 md:h-32 md:w-32 bg-gradient-to-br from-orange-50 to-transparent dark:from-orange-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110 pointer-events-none" />
                    <div className="relative z-10">
                        <span className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-semibold">Dalam Pengiriman</span>
                        <h3 className="text-xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 md:mt-2">
                            {onRouteCount}
                        </h3>
                    </div>
                    <div className="p-2 absolute right-2 bottom-2 md:right-4 md:bottom-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400">
                        <Truck className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                </div>

                {/* In Production Card */}
                <div className="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 h-24 w-24 md:h-32 md:w-32 bg-gradient-to-br from-purple-50 to-transparent dark:from-purple-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110 pointer-events-none" />
                    <div className="relative z-10">
                        <span className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-semibold">Dalam Produksi</span>
                        <h3 className="text-xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 md:mt-2">
                            {arrangingCount}
                        </h3>
                    </div>
                    <div className="p-2 absolute right-2 bottom-2 md:right-4 md:bottom-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                        <Palette className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide pb-2">
                <Link href="/admin/orders?status=PENDING_PAYMENT" className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-sm font-bold text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all">
                    <Clock className="w-4 h-4" />
                    <span>Menunggu Bayar</span>
                    {pendingCount > 0 && <span className="bg-amber-500 text-white px-2 py-0.5 rounded-full text-xs">{pendingCount}</span>}
                </Link>
                <Link href="/admin/orders?status=IN_PRODUCTION" className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl text-sm font-bold text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all">
                    <Palette className="w-4 h-4" />
                    <span>Dalam Produksi</span>
                    {arrangingCount > 0 && <span className="bg-purple-500 text-white px-2 py-0.5 rounded-full text-xs">{arrangingCount}</span>}
                </Link>
                <Link href="/admin/orders?status=ON_DELIVERY" className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl text-sm font-bold text-orange-700 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-all">
                    <Truck className="w-4 h-4" />
                    <span>Dalam Pengiriman</span>
                    {onRouteCount > 0 && <span className="bg-orange-500 text-white px-2 py-0.5 rounded-full text-xs">{onRouteCount}</span>}
                </Link>
                <Link href="/admin/orders?status=COMPLETED" className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-sm font-bold text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Selesai</span>
                    {deliveredCount > 0 && <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs">{deliveredCount}</span>}
                </Link>
            </div>

            {/* Recent Orders Table - Responsive */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">Pesanan Terbaru</h3>
                        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                            {searchQuery ? `Hasil pencarian "${searchQuery}"` : 'Transaksi terbaru dari toko Anda'}
                        </p>
                    </div>
                    <Link href="/admin/orders" className="text-sm font-semibold text-primary hover:text-green-600 transition-colors">
                        Lihat Semua
                    </Link>
                </div>

                {/* Mobile Cards View */}
                <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-700">
                    {filteredOrders.map((order) => (
                        <Link key={order.id} href={`/admin/orders?open=${order.id}`} className="block p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <span className="font-bold text-slate-900 dark:text-white">{order.recipientName}</span>
                                    <span className="text-xs text-slate-500 block">#{order.id.slice(0, 8)}</span>
                                </div>
                                <span className={cn(
                                    "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border",
                                    order.status === 'COMPLETED' ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800" :
                                        order.status === 'PENDING_PAYMENT' ? "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800" :
                                            "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
                                )}>
                                    {statusLabels[order.status] || order.status.replace(/_/g, " ")}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">{format(new Date(order.createdAt), "d MMM, HH:mm", { locale: id })}</span>
                                <span className="font-bold text-slate-900 dark:text-white">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(order.totalAmount)}
                                </span>
                            </div>
                        </Link>
                    ))}
                    {filteredOrders.length === 0 && (
                        <div className="p-8 text-center text-slate-500">
                            {searchQuery ? 'Tidak ada pesanan ditemukan.' : 'Belum ada pesanan.'}
                        </div>
                    )}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">ID Pesanan</th>
                                <th className="px-6 py-4">Pelanggan</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Tanggal</th>
                                <th className="px-6 py-4 text-right">Jumlah</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer" onClick={() => window.location.href = `/admin/orders?open=${order.id}`}>
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
                                            {statusLabels[order.status] || order.status.replace(/_/g, " ")}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                        {format(new Date(order.createdAt), "d MMM, HH:mm", { locale: id })}
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-white">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(order.totalAmount)}
                                    </td>
                                </tr>
                            ))}
                            {filteredOrders.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                        {searchQuery ? 'Tidak ada pesanan ditemukan.' : 'Belum ada pesanan.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Floating Mobile FAB */}
            <Link
                href="/admin/products/new"
                className="fixed bottom-24 right-4 z-40 size-14 bg-primary rounded-full shadow-lg shadow-primary/40 flex items-center justify-center text-slate-900 md:hidden"
            >
                <Plus className="w-7 h-7" />
            </Link>
        </div>
    );
}
