"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Sparkles, Check } from "lucide-react";

interface InteractiveCartButtonProps {
    onClick?: () => void;
    price?: number;
    className?: string;
}

export const InteractiveCartButton = ({ onClick, price, className }: InteractiveCartButtonProps) => {
    const [status, setStatus] = useState<"idle" | "blooming" | "added">("idle");

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (status !== "idle") return;

        setStatus("blooming");
        if (onClick) onClick();

        // Reset after animation
        setTimeout(() => setStatus("added"), 1500);
        setTimeout(() => setStatus("idle"), 3500);
    };

    return (
        <button
            onClick={handleClick}
            className={`relative group overflow-hidden rounded-full font-bold transition-all px-4 py-2 flex items-center justify-center gap-2 ${status === "added" ? "bg-pink-600 text-white w-full" : "bg-rose-gradient text-white w-full hover:opacity-90"
                } ${className}`}
        >
            <AnimatePresence mode="wait">
                {status === "idle" && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        <span className="text-nowrap">Tambah</span>
                    </motion.div>
                )}

                {status === "blooming" && (
                    <motion.div
                        key="blooming"
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        {/* Central Blooming Flower */}
                        <motion.div
                            initial={{ scale: 0, rotate: 0 }}
                            animate={{ scale: [0, 1.2, 1], rotate: 180 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <Sparkles className="w-6 h-6 text-[#102216] fill-current" />
                        </motion.div>

                        {/* Flying Particles */}
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 rounded-full bg-white"
                                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                                animate={{
                                    x: (Math.random() - 0.5) * 100,
                                    y: -Math.random() * 80 - 20,
                                    opacity: 0,
                                    scale: Math.random() * 0.5 + 0.5
                                }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                        ))}
                    </motion.div>
                )}

                {status === "added" && (
                    <motion.div
                        key="added"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-2"
                    >
                        <Check className="w-4 h-4" />
                        <span>Sukses!</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
};
