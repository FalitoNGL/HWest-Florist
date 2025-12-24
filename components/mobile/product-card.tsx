"use client";

import Link from "next/link";
import { BlurImage } from "@/components/ui/blur-image";
import { Eye, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    type: string;
    compact?: boolean;
    isNew?: boolean;
    isBestSeller?: boolean;
}

// Category color mapping
const categoryColors: Record<string, { accent: string; glow: string; badge: string }> = {
    BOUQUET: {
        accent: "from-pink-500 to-rose-500",
        glow: "shadow-pink-500/20",
        badge: "bg-pink-500"
    },
    BOARD_FLOWER: {
        accent: "from-purple-500 to-violet-500",
        glow: "shadow-purple-500/20",
        badge: "bg-purple-500"
    },
    STANDING_FLOWER: {
        accent: "from-fuchsia-500 to-pink-500",
        glow: "shadow-fuchsia-500/20",
        badge: "bg-fuchsia-500"
    },
    RENTAL_ITEM: {
        accent: "from-amber-500 to-orange-500",
        glow: "shadow-amber-500/20",
        badge: "bg-amber-500"
    },
};

export function ProductCard({
    id,
    name,
    description,
    price,
    imageUrl,
    type,
    compact = false,
    isNew = false,
    isBestSeller = false
}: ProductCardProps) {
    const formatPrice = (price: number) => {
        if (price >= 1000000) return `Rp ${(price / 1000000).toFixed(1)}Jt`;
        if (price >= 1000) return `Rp ${(price / 1000).toFixed(0)}Rb`;
        return `Rp ${price}`;
    };

    const colors = categoryColors[type] || categoryColors.BOUQUET;

    // Deterministic badge logic based on product ID (no random to avoid hydration mismatch)
    const idHash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const showNewBadge = isNew || (idHash % 5 === 0); // Show for ~20% of products
    const showBestSeller = isBestSeller || (idHash % 8 === 0); // Show for ~12% of products

    return (
        <Link href={`/product/${id}`} className="block group">
            {/* Glassmorphism Card */}
            <div className={cn(
                "relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden",
                "hover:bg-white/10 hover:border-white/20 transition-all duration-500",
                `hover:shadow-xl hover:${colors.glow}`,
                "hover:scale-[1.02] hover:-translate-y-1"
            )}>
                {/* Image Container with Zoom effect */}
                <div className="relative aspect-square overflow-hidden">
                    {/* Image with zoom on hover */}
                    <BlurImage
                        src={imageUrl || '/placeholder.jpg'}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-125"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/20 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                    {/* Animated Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">
                        {showBestSeller && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-[10px] font-bold text-white shadow-lg animate-pulse">
                                <Star className="w-3 h-3 fill-white" />
                                <span>Best Seller</span>
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </div>
                        )}
                        {showNewBadge && !showBestSeller && (
                            <div className="relative overflow-hidden flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-[10px] font-bold text-white shadow-lg">
                                <Sparkles className="w-3 h-3 animate-pulse" />
                                <span>Baru</span>
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </div>
                        )}
                    </div>

                    {/* Category Badge */}
                    <div className={cn(
                        "absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide text-white/90 z-10",
                        "bg-black/40 backdrop-blur-sm border border-white/10"
                    )}>
                        {type.replace(/_/g, ' ').slice(0, 10)}
                    </div>

                    {/* Floating Action Button - Appear on hover */}
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                        <button
                            onClick={(e) => e.preventDefault()}
                            className={cn(
                                "w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-xs font-semibold transition-all",
                                `bg-gradient-to-r ${colors.accent}`,
                                "hover:shadow-lg hover:scale-105 backdrop-blur-md"
                            )}
                        >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Lihat Detail</span>
                        </button>
                    </div>
                </div>

                {/* Content - Glassmorphism style */}
                <div className={cn(
                    "relative",
                    compact ? "p-2.5" : "p-3"
                )}>
                    {/* Subtle top border glow */}
                    <div className={cn(
                        "absolute top-0 left-4 right-4 h-px",
                        `bg-gradient-to-r from-transparent ${colors.accent} to-transparent`,
                        "opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                    )} />

                    <h4 className={cn(
                        "font-semibold leading-tight line-clamp-1 text-white group-hover:text-white transition-colors",
                        compact ? "text-xs" : "text-sm"
                    )}>
                        {name}
                    </h4>

                    {!compact && (
                        <p className="text-gray-400 text-xs mt-1 line-clamp-1">
                            {description || type.replace(/_/g, ' ')}
                        </p>
                    )}

                    <div className="flex items-center justify-between mt-2">
                        <span className={cn(
                            "font-bold",
                            `bg-gradient-to-r ${colors.accent} bg-clip-text text-transparent`,
                            compact ? "text-xs" : "text-sm"
                        )}>
                            {formatPrice(price)}
                        </span>
                        <div className="flex items-center gap-1">
                            <div className={cn(
                                "w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"
                            )} />
                            <span className="text-[9px] text-green-400/80 font-medium uppercase tracking-wide">
                                Ready
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom accent line */}
                <div className={cn(
                    "absolute bottom-0 left-0 right-0 h-0.5",
                    `bg-gradient-to-r ${colors.accent}`,
                    "opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                )} />
            </div>
        </Link>
    );
}
