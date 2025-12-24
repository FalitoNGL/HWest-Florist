'use client';

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { createOrder } from "@/app/actions/order";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

// --- Form Schema directly imported or redefined ---
const formSchema = z.object({
    recipientName: z.string().min(1, "Name is required"),
    recipientPhone: z.string().min(10, "Valid phone required"),
    deliveryAddress: z.string().min(5, "Address must be clear"),
    deliveryTime: z.date(),
    // Optional based on type
    greetingType: z.string().optional(),
    targetName: z.string().optional(),
    senderName: z.string().optional(),
    cardMessage: z.string().optional(),
    notes: z.string().optional(),
});

interface ProductDetailProps {
    product: {
        id: string;
        name: string;
        type: string;
        price: number;
        description: string | null;
        image: string | null;
    }
}

export function ProductDetailView({ product }: ProductDetailProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            recipientName: "",
            recipientPhone: "",
            deliveryAddress: "",
            greetingType: "",
            targetName: "",
            senderName: "",
            cardMessage: "",
            notes: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        startTransition(async () => {
            const formData = new FormData();
            formData.append("productId", product.id);
            formData.append("productName", product.name);
            formData.append("productType", product.type);

            Object.keys(values).forEach(key => {
                const val = values[key as keyof typeof values];
                if (val instanceof Date) {
                    formData.append(key, val.toISOString());
                } else if (val) {
                    formData.append(key, val as string);
                }
            });

            await createOrder(null, formData);
        });
    }

    const isBoard = product.type === "BOARD_FLOWER";
    const isBouquet = product.type === "BOUQUET";

    return (
        <div className="relative flex flex-col min-h-screen w-full pb-24 bg-[#2A121F] font-display text-white">
            {/* Top Sticky Header */}
            <header className="sticky top-0 z-40 bg-[#2A121F]/90 backdrop-blur-md border-b border-white/10 transition-colors duration-300">
                <div className="flex items-center justify-between px-4 py-3">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </button>
                    <h2 className="text-base font-bold leading-tight tracking-tight text-center truncate px-2 flex-1">
                        {product.name}
                    </h2>
                    <button className="flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-[24px]">favorite_border</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 w-full max-w-lg mx-auto">
                {/* Image Display (Simplified Carousel) */}
                <div className="w-full pt-4 pl-4 overflow-hidden">
                    <div className="flex overflow-x-auto gap-4 pb-4 pr-4 no-scrollbar snap-x snap-mandatory">
                        <div className="flex flex-col gap-3 min-w-[280px] w-[80vw] snap-center">
                            <div className="w-full aspect-[4/5] bg-[#200D18] border border-white/10 rounded-2xl overflow-hidden shadow-sm relative group">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url("${product.image || 'https://placehold.co/600x800'}")` }}
                                ></div>
                            </div>
                            <p className="text-sm font-semibold text-center opacity-70">Standard View</p>
                        </div>
                    </div>
                </div>

                {/* Product Details */}
                <div className="px-5 pt-2">
                    <div className="flex justify-between items-start">
                        <h1 className="text-3xl font-bold tracking-tight leading-tight">{product.name}</h1>
                        <div className="flex flex-col items-end">
                            <span className="text-2xl font-bold text-[#FF2E93]">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(product.price)}
                            </span>
                        </div>
                    </div>
                    <p className="mt-4 text-base leading-relaxed text-gray-300">
                        {product.description || "No description available."}
                    </p>
                    <div className="mt-6 border-b border-white/10"></div>
                </div>

                {/* Form */}
                <form onSubmit={form.handleSubmit(onSubmit)} className="px-5 mt-8 space-y-8">

                    {/* Card Details Section */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-[#FF2E93]">edit_note</span>
                            <h3 className="text-lg font-bold">Card Details</h3>
                        </div>
                        <div className="space-y-4">
                            {isBoard && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5 ml-1 text-gray-300">Greeting Type</label>
                                        <div className="relative">
                                            <select
                                                {...form.register("greetingType")}
                                                className="w-full appearance-none bg-white/5 border border-white/10 text-base text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#FF2E93] focus:border-transparent transition-shadow"
                                            >
                                                <option value="" className="bg-[#2A121F]">Select Greeting...</option>
                                                <option value="Happy Wedding" className="bg-[#2A121F]">Happy Wedding</option>
                                                <option value="Congratulations" className="bg-[#2A121F]">Congratulations</option>
                                                <option value="Deepest Sympathy" className="bg-[#2A121F]">Deepest Sympathy (Duka Cita)</option>
                                                <option value="Happy Birthday" className="bg-[#2A121F]">Happy Birthday</option>
                                                <option value="Grand Opening" className="bg-[#2A121F]">Grand Opening</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                                <span className="material-symbols-outlined text-[20px]">expand_more</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5 ml-1 text-gray-300">Target Name</label>
                                        <input
                                            {...form.register("targetName")}
                                            className="w-full bg-white/5 border border-white/10 text-base text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#FF2E93] focus:border-transparent transition-shadow placeholder-white/30"
                                            placeholder="e.g. Budi & Siti"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5 ml-1 text-gray-300">From (Sender)</label>
                                        <input
                                            {...form.register("senderName")}
                                            className="w-full bg-white/5 border border-white/10 text-base text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#FF2E93] focus:border-transparent transition-shadow placeholder-white/30"
                                            placeholder="Your Name / Family"
                                        />
                                    </div>
                                </>
                            )}

                            {isBouquet && (
                                <div>
                                    <label className="block text-sm font-medium mb-1.5 ml-1 text-gray-300">Card Message</label>
                                    <textarea
                                        {...form.register("cardMessage")}
                                        className="w-full bg-white/5 border border-white/10 text-base text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#FF2E93] focus:border-transparent transition-shadow placeholder-white/30 resize-none"
                                        placeholder="Write a warm message..."
                                        rows={4}
                                    ></textarea>
                                </div>
                            )}
                        </div>
                    </section>

                    <div className="h-px bg-white/10 w-full"></div>

                    {/* Delivery Info Section */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-[#FF2E93]">local_shipping</span>
                            <h3 className="text-lg font-bold">Delivery Information</h3>
                        </div>
                        <div className="space-y-4">
                            {/* Date Picker (Native for Mobile) */}
                            <div>
                                <label className="block text-sm font-medium mb-1.5 ml-1 text-gray-300">Delivery Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        className="w-full bg-white/5 border border-white/10 text-base text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#FF2E93] focus:border-transparent transition-shadow [color-scheme:dark]"
                                        onChange={(e) => form.setValue("deliveryTime", new Date(e.target.value))}
                                    />
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                        <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                                    </div>
                                </div>
                                {form.formState.errors.deliveryTime && (
                                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.deliveryTime.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5 ml-1 text-gray-300">Recipient Name</label>
                                <input
                                    {...form.register("recipientName")}
                                    className="w-full bg-white/5 border border-white/10 text-base text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#FF2E93] focus:border-transparent transition-shadow placeholder-white/30"
                                    placeholder="e.g. Jane Doe"
                                />
                                {form.formState.errors.recipientName && (
                                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.recipientName.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5 ml-1 text-gray-300">Recipient Phone (WA)</label>
                                <input
                                    {...form.register("recipientPhone")}
                                    className="w-full bg-white/5 border border-white/10 text-base text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#FF2E93] focus:border-transparent transition-shadow placeholder-white/30"
                                    placeholder="0812..."
                                />
                                {form.formState.errors.recipientPhone && (
                                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.recipientPhone.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5 ml-1 text-gray-300">Delivery Address</label>
                                <textarea
                                    {...form.register("deliveryAddress")}
                                    className="w-full bg-white/5 border border-white/10 text-base text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#FF2E93] focus:border-transparent transition-shadow placeholder-white/30 resize-none"
                                    placeholder="Full address (Street, Number, etc)..."
                                    rows={3}
                                />
                                {form.formState.errors.deliveryAddress && (
                                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.deliveryAddress.message}</p>
                                )}
                            </div>
                        </div>
                    </section>

                    <div className="h-8"></div>
                </form>
            </main>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-[#200D18]/90 backdrop-blur-md border-t border-white/10 px-5 py-4 z-50 safe-area-bottom shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.2)]">
                <div className="flex items-center gap-4 max-w-lg mx-auto">
                    <div
                        className="h-12 w-12 rounded-lg bg-cover bg-center shrink-0 border border-white/10"
                        style={{ backgroundImage: `url("${product.image || 'https://placehold.co/100'}")` }}
                    ></div>

                    <div className="flex flex-col flex-1">
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total</span>
                        <span className="text-xl font-bold text-white leading-none">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(product.price)}
                        </span>
                    </div>

                    <button
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={isPending}
                        className="bg-gradient-to-r from-[#FF2E93] to-[#c026d3] hover:opacity-90 text-white font-bold text-base py-3.5 px-6 rounded-xl shadow-lg shadow-rose-500/20 active:scale-95 transition-all flex items-center gap-2"
                    >
                        {isPending ? (
                            <Loader2 className="animate-spin h-5 w-5" />
                        ) : (
                            <>
                                <span>Confirm Order</span>
                                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
