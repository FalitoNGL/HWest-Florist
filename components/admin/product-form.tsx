"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ProductType } from "@prisma/client";
import { createProduct, updateProduct, ProductFormData, SerializedProduct } from "@/app/actions/product";
import { toast } from "sonner";
import { Loader2, ArrowLeft, X, Plus, Image as ImageIcon } from "lucide-react";
import { FileUpload } from "@/components/file-upload";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProductFormProps {
    initialData?: SerializedProduct;
    mode: "create" | "edit";
}

export function ProductForm({ initialData, mode }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<ProductFormData>({
        name: initialData?.name || "",
        description: initialData?.description || "",
        price: initialData ? Number(initialData.price) : 0,
        image: initialData?.image || "",
        type: initialData?.type || "BOARD_FLOWER",
        isAvailable: initialData?.isAvailable ?? true,
        stock: initialData?.stock || 0
    });

    const handleChange = (key: keyof ProductFormData, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);

        try {
            let res;
            if (mode === "create") {
                res = await createProduct(formData);
            } else {
                if (!initialData?.id) return;
                res = await updateProduct(initialData.id, formData);
            }

            if (res.success) {
                toast.success(`Product ${mode === 'create' ? 'created' : 'updated'} successfully`);
                router.push("/admin/products");
                router.refresh();
            } else {
                toast.error(res.error || "Something went wrong");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const PRODUCT_TYPES: { label: string; value: ProductType }[] = [
        { label: "Papan", value: "BOARD_FLOWER" },
        { label: "Buket", value: "BOUQUET" },
        { label: "Standing", value: "STANDING_FLOWER" },
        { label: "Rental", value: "RENTAL_ITEM" },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display pb-24 md:pb-10">
            {/* Sticky Header */}
            <header className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center justify-center p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-900 dark:text-white transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-extrabold text-gray-900 dark:text-white">{mode === 'create' ? 'Add Product' : 'Edit Product'}</h1>
                </div>
                <div className="hidden md:flex gap-3">
                    <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="rounded-full px-6 font-bold"
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Product
                    </Button>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="md:hidden px-4 py-1.5 rounded-full bg-primary text-black font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                >
                    {loading && <Loader2 className="w-3 h-3 animate-spin bg-transparent" />}
                    Save
                </button>
            </header>

            <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Left Column: Images */}
                    <div className="md:col-span-5 space-y-6">
                        <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Product Image</h3>

                            <div className="space-y-4">
                                {/* Main Image Preview */}
                                <div className="aspect-square w-full rounded-2xl bg-slate-100 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-700 overflow-hidden relative group">
                                    {formData.image ? (
                                        <>
                                            <div
                                                className="w-full h-full bg-cover bg-center"
                                                style={{ backgroundImage: `url('${formData.image}')` }}
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => handleChange("image", "")}
                                                    className="rounded-full"
                                                >
                                                    <X className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center relative">
                                            <div className="absolute inset-4 z-10 opacity-0 cursor-pointer">
                                                <FileUpload
                                                    endpoint="imageUploader"
                                                    value={formData.image || ""}
                                                    onChange={(url) => handleChange("image", url)}
                                                />
                                            </div>
                                            <div className="pointer-events-none flex flex-col items-center justify-center text-slate-400">
                                                <ImageIcon className="w-12 h-12 mb-2" />
                                                <span className="text-sm font-medium">Click to upload image</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm text-slate-500 text-center">
                                    Recommended size: 1000x1000px. Max 4MB.
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Details */}
                    <div className="md:col-span-7 space-y-6">
                        <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">Product Details</h3>

                            {/* Name */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">Product Name</label>
                                <Input
                                    required
                                    value={formData.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                    placeholder="e.g. Grand Opening Flower Board"
                                    className="h-12 bg-slate-50 dark:bg-slate-900 border-none"
                                />
                            </div>

                            {/* Category Chips */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">Category</label>
                                <div className="flex flex-wrap gap-2">
                                    {PRODUCT_TYPES.map((type) => (
                                        <button
                                            key={type.value}
                                            type="button"
                                            onClick={() => handleChange("type", type.value)}
                                            className={cn(
                                                "px-4 py-2 rounded-xl text-sm font-bold transition-all border",
                                                formData.type === type.value
                                                    ? "bg-primary border-primary text-black shadow-md shadow-primary/20"
                                                    : "bg-slate-50 dark:bg-slate-900 border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                            )}
                                        >
                                            {type.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price & Stock Grid */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">Price (IDR)</label>
                                    <Input
                                        type="number"
                                        required
                                        min="0"
                                        value={formData.price}
                                        onChange={(e) => handleChange("price", parseFloat(e.target.value))}
                                        className="h-12 bg-slate-50 dark:bg-slate-900 border-none font-mono tracking-tight"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">Stock</label>
                                    <div className="flex items-center rounded-xl bg-slate-50 dark:bg-slate-900 overflow-hidden h-12">
                                        <button
                                            type="button"
                                            onClick={() => handleChange("stock", Math.max(0, formData.stock - 1))}
                                            className="w-12 h-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-bold text-lg"
                                        >
                                            -
                                        </button>
                                        <input
                                            className="flex-1 w-full h-full text-center bg-transparent border-none focus:ring-0 p-0 font-bold"
                                            type="number"
                                            value={formData.stock}
                                            onChange={(e) => handleChange("stock", parseInt(e.target.value) || 0)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleChange("stock", formData.stock + 1)}
                                            className="w-12 h-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-bold text-lg"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">Description</label>
                                <Textarea
                                    value={formData.description || ""}
                                    onChange={(e) => handleChange("description", e.target.value)}
                                    className="bg-slate-50 dark:bg-slate-900 border-none rounded-xl min-h-[150px] resize-none p-4 leading-relaxed"
                                    placeholder="Describe the product details, size, and flowers used..."
                                />
                            </div>

                            {/* Status Toggle */}
                            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900">
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-gray-900 dark:text-white">Active Product</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Product visible to customers</span>
                                </div>
                                <Switch
                                    checked={formData.isAvailable}
                                    onCheckedChange={(checked) => handleChange("isAvailable", checked)}
                                />
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* Sticky Bottom Action (Mobile Only) */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 md:hidden z-40">
                <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/20"
                >
                    {loading ? "Saving..." : "Save Product"}
                </Button>
            </div>
        </div>
    );
}
