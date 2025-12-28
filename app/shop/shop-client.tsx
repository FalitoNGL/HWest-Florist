"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useScroll, Variants } from "framer-motion";
import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/mobile/bottom-nav";
import { ProductCard } from "@/components/mobile/product-card";
import { Search, ShoppingBag, Sparkles, ArrowUpDown, Grid3X3, List, X, Eye, ChevronDown } from "lucide-react";
import { BlurImage } from "@/components/ui/blur-image";
import { cn } from "@/lib/utils";

// Animation Variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

interface Product {
    id: string;
    name: string;
    description: string | null;
    price: number;
    image: string | null;
    type: string;
    stock: number;
    isAvailable: boolean;
    createdAt?: Date;
}

interface ShopClientProps {
    products: Product[];
}

type SortOption = "default" | "price-asc" | "price-desc" | "newest";
type ViewMode = "grid" | "list";

// Quick View Modal Component
function QuickViewModal({ product, isOpen, onClose }: { product: Product | null; isOpen: boolean; onClose: () => void }) {
    if (!isOpen || !product) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="bg-[#200D18] border border-white/10 rounded-2xl overflow-hidden max-w-lg w-full max-h-[85vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image */}
                        <div className="relative aspect-square w-full">
                            <BlurImage
                                src={product.image || '/placeholder.jpg'}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 512px) 100vw, 512px"
                            />
                            <button
                                onClick={onClose}
                                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="absolute top-3 left-3">
                                <span className="px-3 py-1 bg-[#FF2E93] rounded-full text-xs font-bold uppercase tracking-wide">
                                    {product.type.replace(/_/g, ' ')}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">{product.name}</h2>
                                <p className="text-gray-400 text-sm">{product.description || "Rangkaian bunga premium dari HWest Florist"}</p>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E93] to-[#c026d3]">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(product.price)}
                                </span>
                                <span className={cn(
                                    "px-3 py-1 rounded-full text-xs font-semibold",
                                    product.isAvailable ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                                )}>
                                    {product.isAvailable ? "Tersedia" : "Habis"}
                                </span>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <a
                                    href={`/product/${product.id}`}
                                    className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold text-center hover:bg-white/20 transition-colors"
                                >
                                    Lihat Detail
                                </a>
                                <a
                                    href={`/order?product=${encodeURIComponent(product.name)}`}
                                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#FF2E93] to-[#c026d3] text-white font-semibold text-center hover:opacity-90 transition-opacity"
                                >
                                    Pesan Sekarang
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Product Card with Quick View button
function ProductCardWithQuickView({
    product,
    viewMode,
    onQuickView
}: {
    product: Product;
    viewMode: ViewMode;
    onQuickView: (product: Product) => void;
}) {
    if (viewMode === "list") {
        return (
            <div className="flex gap-4 bg-[#200D18] border border-white/10 rounded-xl overflow-hidden p-3 group">
                <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <BlurImage
                        src={product.image || '/placeholder.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-white font-bold text-sm line-clamp-1 group-hover:text-[#FF2E93] transition-colors">{product.name}</h4>
                    <p className="text-gray-400 text-xs line-clamp-1 mt-1">{product.description || product.type}</p>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-[#c026d3] font-bold text-sm">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(product.price)}
                        </span>
                        <button
                            onClick={() => onQuickView(product)}
                            className="p-2 rounded-lg bg-white/10 hover:bg-[#FF2E93]/20 text-white/60 hover:text-[#FF2E93] transition-all"
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative group">
            <ProductCard
                id={product.id}
                name={product.name}
                description={product.description || ""}
                price={Number(product.price)}
                imageUrl={product.image || ""}
                type={product.type}
            />
            {/* Quick View Button Overlay */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onQuickView(product);
                }}
                className="absolute top-12 right-2 p-2 rounded-full bg-black/60 backdrop-blur-sm text-white/80 hover:text-white hover:bg-[#FF2E93] transition-all opacity-0 group-hover:opacity-100 z-20"
            >
                <Eye className="w-4 h-4" />
            </button>
        </div>
    );
}

export default function ShopClient({ products }: ShopClientProps) {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState<SortOption>("default");
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
    const scrollRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: scrollRef });

    // Calculate min/max prices from products
    const { minPrice, maxPrice } = useMemo(() => {
        if (products.length === 0) return { minPrice: 0, maxPrice: 10000000 };
        const prices = products.map(p => Number(p.price));
        return {
            minPrice: Math.min(...prices),
            maxPrice: Math.max(...prices)
        };
    }, [products]);

    // Initialize price range
    useEffect(() => {
        setPriceRange([minPrice, maxPrice]);
    }, [minPrice, maxPrice]);

    // Categories with counts
    const categoriesWithCounts = useMemo(() => {
        const baseCats = [
            { id: "All", label: "Semua" },
            { id: "BOARD_FLOWER", label: "Papan Bunga" },
            { id: "BOARD_RUSTIC", label: "Papan Rustik" },
            { id: "BOARD_ACRYLIC", label: "Papan Akrilik" },
            { id: "BOUQUET", label: "Buket Bunga" },
            { id: "BOUQUET_MONEY", label: "Buket Uang" },
            { id: "BOUQUET_SNACK", label: "Buket Snack" },
            { id: "TABLE_FLOWER", label: "Bunga Meja" },
            { id: "STANDING_FLOWER", label: "Standing" },
            { id: "DECORATION", label: "Dekorasi" },
            { id: "CUSTOM", label: "Custom" }
        ];
        return baseCats.map(cat => ({
            ...cat,
            count: cat.id === "All" ? products.length : products.filter(p => p.type === cat.id).length
        }));
    }, [products]);

    // Sort options
    const sortOptions = [
        { value: "default", label: "Default" },
        { value: "price-asc", label: "Harga: Termurah" },
        { value: "price-desc", label: "Harga: Termahal" },
        { value: "newest", label: "Terbaru" },
    ];

    // Filtered and sorted products
    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        // Category filter
        if (selectedCategory !== "All") {
            filtered = filtered.filter(p => p.type === selectedCategory);
        }

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        // Price filter
        filtered = filtered.filter(p => {
            const price = Number(p.price);
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // Sort
        switch (sortOption) {
            case "price-asc":
                filtered.sort((a, b) => Number(a.price) - Number(b.price));
                break;
            case "price-desc":
                filtered.sort((a, b) => Number(b.price) - Number(a.price));
                break;
            case "newest":
                filtered.sort((a, b) => {
                    if (a.createdAt && b.createdAt) {
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    }
                    return 0;
                });
                break;
        }

        return filtered;
    }, [products, selectedCategory, searchQuery, sortOption, priceRange]);

    const formatPrice = (price: number) => {
        if (price >= 1000000) return `${(price / 1000000).toFixed(1)}Jt`;
        if (price >= 1000) return `${(price / 1000).toFixed(0)}Rb`;
        return price.toString();
    };

    return (
        <div ref={scrollRef} className="relative flex min-h-screen flex-col bg-[#2A121F] text-white font-display overflow-x-hidden pb-24 selection:bg-[#FF2E93] selection:text-white">

            <Header />

            {/* Quick View Modal */}
            <QuickViewModal
                product={quickViewProduct}
                isOpen={!!quickViewProduct}
                onClose={() => setQuickViewProduct(null)}
            />

            {/* Premium Hero Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative w-full h-[40vh] overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#2A121F]/20 via-transparent to-[#2A121F] z-10" />
                <BlurImage
                    src="https://images.unsplash.com/photo-1531058240690-006c446962d8?q=80&w=1200&auto=format&fit=crop"
                    alt="Hero Bloom"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4 pt-12">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FF2E93] text-xs font-bold tracking-widest uppercase mb-4 shadow-lg shadow-rose-500/20">
                            Edisi Spesial
                        </span>
                    </motion.div>
                    <motion.h1
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                        className="text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-lg mb-2"
                    >
                        Keindahan <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E93] to-[#c026d3]">Abadi</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-white/80 max-w-xs md:max-w-md text-sm font-light"
                    >
                        Rangkaian bunga premium untuk setiap momen berharga.
                    </motion.p>
                </div>
            </motion.div>

            {/* Sticky Search & Filter Bar */}
            <div className="sticky top-16 z-40 px-4 py-3 -mt-6">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-[#200D18]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-3 space-y-3"
                >
                    {/* Search + Sort + View Toggle Row */}
                    <div className="flex gap-2">
                        {/* Search Input */}
                        <div className="flex-1 relative flex items-center bg-black/20 rounded-xl px-3 py-2.5 border border-white/5 focus-within:border-[#FF2E93]/50 transition-all">
                            <Search className="w-4 h-4 text-white/40 mr-2" />
                            <input
                                type="text"
                                placeholder="Cari produk..."
                                className="bg-transparent border-none outline-none text-white placeholder:text-white/30 w-full text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery("")} className="text-white/50 hover:text-[#FF2E93]">
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowSortDropdown(!showSortDropdown)}
                                className="flex items-center gap-1 px-3 py-2.5 bg-black/20 rounded-xl border border-white/5 text-white/70 hover:text-white hover:border-white/20 transition-all"
                            >
                                <ArrowUpDown className="w-4 h-4" />
                                <ChevronDown className={cn("w-3 h-3 transition-transform", showSortDropdown && "rotate-180")} />
                            </button>
                            <AnimatePresence>
                                {showSortDropdown && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute right-0 top-full mt-2 w-44 bg-[#200D18] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50"
                                    >
                                        {sortOptions.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => {
                                                    setSortOption(opt.value as SortOption);
                                                    setShowSortDropdown(false);
                                                }}
                                                className={cn(
                                                    "w-full px-4 py-2.5 text-left text-sm transition-colors",
                                                    sortOption === opt.value
                                                        ? "bg-[#FF2E93]/20 text-[#FF2E93]"
                                                        : "text-white/70 hover:bg-white/5 hover:text-white"
                                                )}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* View Toggle */}
                        <div className="flex bg-black/20 rounded-xl border border-white/5 overflow-hidden">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={cn(
                                    "p-2.5 transition-colors",
                                    viewMode === "grid" ? "bg-[#FF2E93]/20 text-[#FF2E93]" : "text-white/50 hover:text-white"
                                )}
                            >
                                <Grid3X3 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={cn(
                                    "p-2.5 transition-colors",
                                    viewMode === "list" ? "bg-[#FF2E93]/20 text-[#FF2E93]" : "text-white/50 hover:text-white"
                                )}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Category Chips with Counts */}
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                        {categoriesWithCounts.map((cat) => (
                            <motion.button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                whileTap={{ scale: 0.95 }}
                                className={cn(
                                    "flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border flex items-center gap-1.5",
                                    selectedCategory === cat.id
                                        ? "bg-gradient-to-r from-[#FF2E93] to-[#c026d3] border-transparent text-white shadow-lg shadow-rose-500/20"
                                        : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                                )}
                            >
                                {cat.label}
                                <span className={cn(
                                    "text-xs px-1.5 py-0.5 rounded-full",
                                    selectedCategory === cat.id ? "bg-white/20" : "bg-white/10"
                                )}>
                                    {cat.count}
                                </span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Price Range Filter */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-white/50">
                            <span>Rentang Harga</span>
                            <span className="text-white/80">
                                {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="range"
                                min={minPrice}
                                max={maxPrice}
                                value={priceRange[0]}
                                onChange={(e) => setPriceRange([Math.min(Number(e.target.value), priceRange[1] - 100000), priceRange[1]])}
                                className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#FF2E93]"
                            />
                            <input
                                type="range"
                                min={minPrice}
                                max={maxPrice}
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0] + 100000)])}
                                className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#FF2E93]"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Content Container */}
            <div className="px-4 py-4 space-y-6 min-h-[500px]">

                {/* Featured Products Section */}
                {selectedCategory === "All" && !searchQuery && (
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="space-y-3"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-[#FF2E93]" />
                                Unggulan
                            </h3>
                        </div>

                        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">
                            {[1, 2].map((item) => (
                                <motion.div
                                    key={item}
                                    variants={itemVariants}
                                    className="snap-center shrink-0 w-72 h-40 rounded-xl relative overflow-hidden group border border-white/10 shadow-lg"
                                >
                                    <BlurImage
                                        src={item === 1 ? "https://images.unsplash.com/photo-1604323990536-e5452c0507c1?q=80&w=600&auto=format&fit=crop" : "https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?q=80&w=600&auto=format&fit=crop"}
                                        alt="Featured"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 80vw, 288px"
                                        priority={true}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A121F] via-transparent to-transparent opacity-80" />
                                    <div className="absolute bottom-3 left-3">
                                        <span className="px-2 py-0.5 bg-[#FF2E93] rounded text-[10px] font-bold uppercase tracking-wider mb-1 inline-block">
                                            {item === 1 ? "Best Seller" : "New Arrival"}
                                        </span>
                                        <h4 className="text-base font-bold text-white leading-tight">
                                            {item === 1 ? "Papan Bunga Grand Opening" : "Rose Bouquet Deluxe"}
                                        </h4>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Main Product Grid/List */}
                <motion.div layout className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5 text-[#c026d3]" />
                            {categoriesWithCounts.find(c => c.id === selectedCategory)?.label || "Produk"}
                        </h3>
                        <span className="text-xs text-white/40">{filteredProducts.length} Produk</span>
                    </div>

                    <motion.div
                        layout
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className={cn(
                            viewMode === "grid"
                                ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
                                : "flex flex-col gap-3"
                        )}
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <motion.div
                                        layout
                                        key={product.id}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="show"
                                        exit={{ opacity: 0, scale: 0.9 }}
                                    >
                                        <ProductCardWithQuickView
                                            product={product}
                                            viewMode={viewMode}
                                            onQuickView={setQuickViewProduct}
                                        />
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="col-span-2 py-12 text-center text-white/50"
                                >
                                    <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                    <p>Tidak ada produk yang ditemukan.</p>
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            setSelectedCategory("All");
                                            setPriceRange([minPrice, maxPrice]);
                                        }}
                                        className="mt-3 text-[#FF2E93] hover:underline text-sm"
                                    >
                                        Reset Filter
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>

            </div>

            {/* Horizontal Category Sections - When viewing All */}
            {selectedCategory === "All" && !searchQuery && (
                <div className="px-4 space-y-8">
                    {categoriesWithCounts.filter(c => c.id !== "All" && c.count > 0).map((category) => {
                        const categoryProducts = products.filter(p => p.type === category.id).slice(0, 8);
                        if (categoryProducts.length === 0) return null;
                        return (
                            <motion.div
                                key={category.id}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                variants={containerVariants}
                                className="space-y-3"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-base font-bold text-white">{category.label}</h3>
                                    <button
                                        onClick={() => setSelectedCategory(category.id)}
                                        className="text-xs text-[#FF2E93] hover:underline flex items-center gap-1"
                                    >
                                        Lihat Semua ({category.count})
                                    </button>
                                </div>
                                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
                                    {categoryProducts.map((product) => (
                                        <motion.div
                                            key={product.id}
                                            variants={itemVariants}
                                            className="w-36 flex-shrink-0"
                                        >
                                            <ProductCard
                                                id={product.id}
                                                name={product.name}
                                                description={product.description || ""}
                                                price={Number(product.price)}
                                                imageUrl={product.image || ""}
                                                type={product.type}
                                                compact
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}


            <BottomNav />
        </div>
    );
}
