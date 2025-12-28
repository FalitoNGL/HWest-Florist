"use client"

import { useState } from "react";
import { SerializedProduct, deleteProduct, duplicateProduct } from "@/app/actions/product";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2, Plus, Search, MoreHorizontal, Filter, Copy } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProductTableProps {
    products: SerializedProduct[];
}

export function ProductTable({ products }: ProductTableProps) {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState<string>("ALL");

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        const matchesType = typeFilter === "ALL" || product.type === typeFilter;
        return matchesSearch && matchesType;
    });

    const handleDelete = async (id: string) => {
        if (!confirm("Yakin ingin menghapus produk ini?")) return;

        const res = await deleteProduct(id);
        if (res.success) {
            toast.success("Produk berhasil dihapus");
            router.refresh();
        } else {
            toast.error("Gagal menghapus produk");
        }
    };

    const handleDuplicate = async (id: string) => {
        const res = await duplicateProduct(id);
        if (res.success) {
            toast.success("Produk berhasil diduplikat");
            router.refresh();
        } else {
            toast.error(res.error || "Gagal menduplikat produk");
        }
    };

    return (
        <div className="space-y-6 font-display">
            {/* Desktop Controls */}
            <div className="hidden md:flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex gap-4 flex-1">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Cari produk..."
                            className="pl-9 bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-1"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-[180px] bg-slate-50 dark:bg-slate-900 border-none">
                            <Filter className="w-4 h-4 mr-2 text-slate-500" />
                            <SelectValue placeholder="Filter Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">Semua Tipe</SelectItem>
                            <SelectItem value="BOUQUET">Buket</SelectItem>
                            <SelectItem value="FLOWER_BOARD">Papan Bunga</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="text-sm text-slate-500 font-medium">
                    Menampilkan <span className="text-slate-900 dark:text-white font-bold">{filteredProducts.length}</span> produk
                </div>
            </div>

            {/* Mobile Header & Controls */}
            <div className="md:hidden space-y-4 -mx-4 px-4 pt-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-slate-900 dark:text-white text-xl font-extrabold tracking-tight">Katalog Produk</h2>
                    <Link href="/admin/products/new">
                        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-slate-900 shadow-lg shadow-primary/20 transition-transform active:scale-95">
                            <Plus className="font-bold h-6 w-6" />
                        </button>
                    </Link>
                </div>

                {/* Mobile Search */}
                <div className="relative flex items-center w-full h-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="grid place-items-center h-full w-12 text-slate-400">
                        <Search className="h-5 w-5" />
                    </div>
                    <input
                        className="h-full w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-base font-medium border-none focus:ring-0 p-0 pr-4 outline-none"
                        placeholder="Cari produk..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Mobile Filter Chips */}
                <div className="w-full overflow-x-auto no-scrollbar pb-1">
                    <div className="flex space-x-2">
                        {["ALL", "BOUQUET", "FLOWER_BOARD"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setTypeFilter(type)}
                                className={cn(
                                    "flex-shrink-0 px-5 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all border",
                                    typeFilter === type
                                        ? "bg-primary border-primary text-slate-900 font-bold shadow-md shadow-primary/20"
                                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                                )}
                            >
                                {type === "ALL" ? "Semua" : type === "FLOWER_BOARD" ? "Papan" : "Buket"}
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
                            <TableHead className="py-4 pl-6 text-xs font-bold uppercase tracking-wider text-slate-500">Nama</TableHead>
                            <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Tipe</TableHead>
                            <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Harga</TableHead>
                            <TableHead className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</TableHead>
                            <TableHead className="py-4 pr-6 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProducts.map((product) => (
                            <TableRow key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 border-b border-slate-100 dark:border-slate-800 transition-colors">
                                <TableCell className="pl-6 py-4 font-medium">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-lg bg-slate-100 dark:bg-slate-700 bg-cover bg-center shrink-0 shadow-sm border border-slate-200 dark:border-slate-700"
                                            style={{ backgroundImage: `url('${product.image || '/placeholder.png'}')` }}
                                        />
                                        <span className="text-slate-900 dark:text-white font-bold">{product.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 text-slate-600 dark:text-slate-300">
                                    {
                                        {
                                            BOARD_FLOWER: "Papan Bunga",
                                            BOARD_RUSTIC: "Papan Rustik",
                                            BOARD_ACRYLIC: "Papan Akrilik",
                                            BOUQUET: "Buket Bunga",
                                            BOUQUET_MONEY: "Buket Uang",
                                            BOUQUET_SNACK: "Buket Snack",
                                            TABLE_FLOWER: "Bunga Meja",
                                            STANDING_FLOWER: "Standing",
                                            DECORATION: "Dekorasi",
                                            CUSTOM: "Custom"
                                        }[product.type] || product.type}
                                </TableCell>
                                <TableCell className="py-4 font-mono font-medium text-slate-900 dark:text-white">
                                    Rp {Number(product.price).toLocaleString("id-ID")}
                                </TableCell>
                                <TableCell className="py-4">
                                    <span className={cn(
                                        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border",
                                        product.isAvailable
                                            ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                                            : "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                                    )}>
                                        <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", product.isAvailable ? "bg-green-500" : "bg-red-500")} />
                                        {product.isAvailable ? 'Available' : 'Unavailable'}
                                    </span>
                                </TableCell>
                                <TableCell className="pr-6 py-4 text-right space-x-1">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500 hover:text-blue-600 hover:bg-blue-50" onClick={() => handleDuplicate(product.id)} title="Duplikat">
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                    <Link href={`/admin/products/${product.id}`}>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500 hover:text-primary hover:bg-primary/10" title="Edit">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(product.id)} title="Hapus">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredProducts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-12 text-slate-500">
                                    <div className="flex flex-col items-center justify-center">
                                        <Search className="h-12 w-12 text-slate-300 mb-3" />
                                        <p className="text-lg font-medium text-slate-900 dark:text-white">No products found</p>
                                        <p className="text-sm text-slate-500">Try adjusting your search or filter.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile Card List View */}
            <div className="md:hidden space-y-3 pb-24">
                <div className="flex items-center justify-between py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <span>{filteredProducts.length} Products</span>
                </div>

                {filteredProducts.map((product) => (
                    <div key={product.id} className="group relative flex items-center p-3 gap-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all active:scale-[0.99]">
                        <div className="relative shrink-0">
                            <div className="h-16 w-16 rounded-xl bg-slate-100 dark:bg-slate-700 bg-cover bg-center border border-slate-200 dark:border-slate-700"
                                style={{ backgroundImage: `url('${product.image || '/placeholder.png'}')` }}></div>
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h3 className="text-base font-bold text-slate-900 dark:text-white truncate pr-2">{product.name}</h3>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
                                            <MoreHorizontal className="h-5 w-5" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleDuplicate(product.id)}>
                                            <Copy className="h-4 w-4 mr-2" /> Duplikat
                                        </DropdownMenuItem>
                                        <Link href={`/admin/products/${product.id}`}>
                                            <DropdownMenuItem>
                                                <Edit className="h-4 w-4 mr-2" /> Edit
                                            </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(product.id)}>
                                            <Trash2 className="h-4 w-4 mr-2" /> Hapus
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 font-mono">
                                    Rp {Number(product.price).toLocaleString("id-ID")}
                                </span>
                                <span className="text-xs text-slate-300 dark:text-slate-600">•</span>
                                <div className={cn("flex items-center gap-1.5 px-2 py-0.5 rounded-md", product.isAvailable ? "bg-primary/10 dark:bg-primary/20" : "bg-red-100 dark:bg-red-900/30")}>
                                    <span className={cn("w-1.5 h-1.5 rounded-full", product.isAvailable ? "bg-primary" : "bg-red-500")}></span>
                                    <span className={cn("text-[10px] font-bold uppercase tracking-wide", product.isAvailable ? "text-primary" : "text-red-700 dark:text-red-400")}>
                                        {product.isAvailable ? "In Stock" : "Unavailable"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}
