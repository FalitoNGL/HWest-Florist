"use client"

import { useState } from "react";

import { OrderStatus } from "@prisma/client";
import { SerializedOrder } from "@/app/actions/admin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, isToday, isYesterday } from "date-fns";
import { Eye, Search, SlidersHorizontal, Plus } from "lucide-react";
import { OrderDetailDialog } from "@/components/admin/order-detail-dialog";
import { cn } from "@/lib/utils";

interface OrdersViewProps {
    orders: SerializedOrder[];
}

export function OrdersView({ orders }: OrdersViewProps) {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("ALL");
    const [selectedOrder, setSelectedOrder] = useState<SerializedOrder | null>(null);

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.recipientName.toLowerCase().includes(search.toLowerCase()) ||
            order.id.toLowerCase().includes(search.toLowerCase()) ||
            order.recipientPhone.includes(search);

        const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case 'PENDING_PAYMENT': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
            case 'PAID': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
            case 'IN_PRODUCTION':
            case 'DESIGN_DRAFT':
            case 'WAITING_APPROVAL':
                return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800';
            case 'READY_TO_SHIP':
            case 'ON_DELIVERY':
                return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800';
            case 'COMPLETED': return 'bg-primary/20 text-primary border-primary/30 dark:bg-primary/20 dark:text-primary dark:border-primary/30';
            case 'CANCELLED': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
            default: return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
        }
    };

    const getStatusDotColor = (status: OrderStatus) => {
        switch (status) {
            case 'PENDING_PAYMENT': return 'bg-amber-500';
            case 'PAID': return 'bg-blue-500';
            case 'IN_PRODUCTION':
            case 'DESIGN_DRAFT':
            case 'WAITING_APPROVAL':
                return 'bg-purple-500';
            case 'READY_TO_SHIP':
            case 'ON_DELIVERY':
                return 'bg-orange-500';
            case 'COMPLETED': return 'bg-green-500';
            case 'CANCELLED': return 'bg-red-500';
            default: return 'bg-slate-500';
        }
    }

    // Mobile Grouping Logic
    const todayOrders = filteredOrders.filter(o => isToday(new Date(o.createdAt)));
    const yesterdayOrders = filteredOrders.filter(o => isYesterday(new Date(o.createdAt)));
    const otherOrders = filteredOrders.filter(o => !isToday(new Date(o.createdAt)) && !isYesterday(new Date(o.createdAt)));

    return (
        <div className="space-y-6 font-display">
            {/* Desktop Controls */}
            <div className="hidden md:flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex gap-4 flex-1">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Cari ID pesanan, penerima..."
                            className="pl-9 bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-1"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[200px] bg-slate-50 dark:bg-slate-900 border-none">
                            <SlidersHorizontal className="w-4 h-4 mr-2 text-slate-500" />
                            <SelectValue placeholder="Filter Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">Semua Status</SelectItem>
                            <SelectItem value="PENDING_PAYMENT">Menunggu Bayar</SelectItem>
                            <SelectItem value="PAID">Lunas</SelectItem>
                            <SelectItem value="IN_PRODUCTION">Dalam Produksi</SelectItem>
                            <SelectItem value="ON_DELIVERY">Dalam Pengiriman</SelectItem>
                            <SelectItem value="COMPLETED">Selesai</SelectItem>
                            <SelectItem value="CANCELLED">Dibatalkan</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="text-sm text-slate-500 font-medium">
                    Menampilkan <span className="text-slate-900 dark:text-white font-bold">{filteredOrders.length}</span> pesanan
                </div>
            </div>

            {/* Mobile Header & Controls */}
            <div className="md:hidden space-y-4 -mx-4 px-4 pt-2">
                {/* Mobile Page Header (Mockup Style) */}
                <div className="flex items-center justify-between">
                    <h2 className="text-slate-900 dark:text-white text-xl font-extrabold tracking-tight">Pesanan</h2>
                    <button className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-slate-900 shadow-lg shadow-primary/20 transition-transform active:scale-95">
                        <Plus className="font-bold h-6 w-6" />
                    </button>
                </div>

                {/* Mobile Search */}
                <div className="relative flex items-center w-full h-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="grid place-items-center h-full w-12 text-slate-400">
                        <Search className="h-5 w-5" />
                    </div>
                    <input
                        className="h-full w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-base font-medium border-none focus:ring-0 p-0 pr-4 outline-none"
                        placeholder="Cari berdasarkan ID atau nama..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Mobile Filter Chips */}
                <div className="w-full overflow-x-auto no-scrollbar pb-1">
                    <div className="flex space-x-2">
                        {["ALL", "PENDING_PAYMENT", "PAID", "IN_PRODUCTION", "COMPLETED"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={cn(
                                    "flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border",
                                    statusFilter === status
                                        ? "bg-primary border-primary text-slate-900 shadow-md shadow-primary/20"
                                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                                )}
                            >
                                {status === "ALL" ? "Semua" :
                                    status === "PENDING_PAYMENT" ? "Menunggu" :
                                        status === "PAID" ? "Lunas" :
                                            status === "IN_PRODUCTION" ? "Produksi" :
                                                status === "COMPLETED" ? "Selesai" : status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                            <TableHead className="py-4 pl-6 text-xs font-bold uppercase tracking-wider text-slate-500">ID Pesanan</TableHead>
                            <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Tanggal</TableHead>
                            <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Penerima</TableHead>
                            <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Total</TableHead>
                            <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</TableHead>
                            <TableHead className="py-4 pr-6 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredOrders.map((order) => (
                            <TableRow key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 border-b border-slate-100 dark:border-slate-800 transition-colors">
                                <TableCell className="pl-6 py-4 font-mono font-medium text-slate-900 dark:text-white">#{order.id.slice(0, 8)}</TableCell>
                                <TableCell className="py-4 text-slate-600 dark:text-slate-300">
                                    {format(new Date(order.createdAt), "MMM d, yyyy")}
                                </TableCell>
                                <TableCell className="py-4">
                                    <div className="font-bold text-slate-900 dark:text-white">{order.recipientName}</div>
                                    <div className="text-xs text-slate-500">{order.recipientPhone}</div>
                                </TableCell>
                                <TableCell className="py-4 font-bold text-slate-900 dark:text-white">
                                    Rp {Number(order.totalAmount).toLocaleString("id-ID")}
                                </TableCell>
                                <TableCell className="py-4">
                                    <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border", getStatusColor(order.status))}>
                                        <span className={cn("inline-block w-1.5 h-1.5 rounded-full mr-1.5", getStatusDotColor(order.status))}></span>
                                        {order.status.replace(/_/g, " ")}
                                    </span>
                                </TableCell>
                                <TableCell className="pr-6 py-4 text-right">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSelectedOrder(order)}
                                        className="h-8 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                                    >
                                        Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredOrders.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-12 text-slate-500">
                                    <div className="flex flex-col items-center justify-center">
                                        <Search className="h-12 w-12 text-slate-300 mb-3" />
                                        <p className="text-lg font-medium text-slate-900 dark:text-white">Tidak ada pesanan</p>
                                        <p className="text-sm text-slate-500">Coba sesuaikan pencarian atau filter Anda.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile Card List View */}
            <div className="md:hidden space-y-6 pb-20">
                {filteredOrders.length === 0 && (
                    <div className="text-center py-10 text-gray-500">Tidak ada pesanan ditemukan.</div>
                )}

                {[
                    { title: "Hari Ini", data: todayOrders },
                    { title: "Kemarin", data: yesterdayOrders },
                    { title: "Sebelumnya", data: otherOrders }
                ].map((section) => (
                    section.data.length > 0 && (
                        <div key={section.title} className="space-y-3">
                            <div className="flex items-center justify-between py-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{section.title}</span>
                            </div>
                            {section.data.map(order => (
                                <div
                                    key={order.id}
                                    onClick={() => setSelectedOrder(order)}
                                    className="group relative flex flex-col gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-transform"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-3">
                                            {/* Thumbnail (Use logic to find image) */}
                                            <div
                                                className="h-14 w-14 rounded-lg bg-slate-100 dark:bg-slate-700 bg-cover bg-center shrink-0 border border-slate-200 dark:border-slate-700"
                                                style={{ backgroundImage: `url('${order.items[0]?.image || '/placeholder.png'}')` }}
                                            ></div>
                                            <div className="flex flex-col">
                                                <h3 className="text-slate-900 dark:text-white font-bold text-base leading-tight">Order #{order.id.slice(0, 4)}</h3>
                                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-0.5">{order.recipientName}</p>
                                                <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5 truncate max-w-[140px]">
                                                    {order.items.map(i => i.productName).join(", ")}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-slate-900 dark:text-white font-bold text-lg">
                                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(order.totalAmount))}
                                            </p>
                                            <p className="text-slate-400 dark:text-slate-500 text-xs">
                                                {format(new Date(order.createdAt), "h:mm a")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-slate-700/50">
                                        <div className="flex items-center gap-2">
                                            <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold border", getStatusColor(order.status))}>
                                                <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", getStatusDotColor(order.status))}></span>
                                                {order.status.replace(/_/g, " ")}
                                            </span>
                                        </div>
                                        <span className="material-symbols-outlined text-slate-400 dark:text-slate-500">chevron_right</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ))}
            </div>

            {selectedOrder && (
                <OrderDetailDialog
                    order={selectedOrder}
                    open={!!selectedOrder}
                    onOpenChange={(open) => !open && setSelectedOrder(null)}
                    trigger={<></>}
                />
            )}
        </div>
    );
}

