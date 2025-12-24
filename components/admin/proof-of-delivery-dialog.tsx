"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/file-upload";
import { completeOrder, SerializedOrder } from "@/app/actions/admin";
import { toast } from "sonner";
import { Loader2, Camera, MapPin, Package, History, Image as ImageIcon, X } from "lucide-react";
import { format } from "date-fns";

interface ProofOfDeliveryDialogProps {
    order: SerializedOrder;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ProofOfDeliveryDialog({ order, open, onOpenChange }: ProofOfDeliveryDialogProps) {
    const [loading, setLoading] = useState(false);
    const [proofImage, setProofImage] = useState<string>("");
    const [notes, setNotes] = useState("");

    const handleComplete = async () => {
        if (!proofImage) {
            toast.error("Please upload a proof of delivery photo.");
            return;
        }

        setLoading(true);
        try {
            const res = await completeOrder(order.id, proofImage);
            if (res.success) {
                toast.success("Order completed successfully!");
                onOpenChange(false);
            } else {
                toast.error("Failed to complete order.");
            }
        } catch (error) {
            toast.error("An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark">

                {/* Header */}
                <div className="flex items-center p-4 border-b border-gray-100 dark:border-gray-800">
                    <DialogTitle className="text-lg font-bold flex-1 text-center">Upload Proof</DialogTitle>
                    <button onClick={() => onOpenChange(false)} className="absolute right-4 text-gray-500 hover:text-gray-900">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
                    {/* Order Summary Card */}
                    <div className="flex gap-4 p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 shadow-sm">
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    #{order.id.slice(0, 8)}
                                </span>
                            </div>
                            <h3 className="font-bold text-base">{order.recipientName}</h3>
                            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                                <MapPin className="w-3.5 h-3.5" />
                                <span className="truncate max-w-[180px]">{order.deliveryAddress}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-1">
                                <Package className="w-3.5 h-3.5" />
                                <span className="truncate max-w-[180px]">
                                    {order.items.map(i => `${i.productName} x${i.quantity}`).join(", ")}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Photo Capture Area */}
                    <div>
                        <h3 className="font-bold mb-3">Proof of Delivery</h3>
                        {!proofImage ? (
                            <div className="w-full aspect-[4/5] bg-gray-50 dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center p-6 text-center hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors relative overflow-hidden">
                                <FileUpload
                                    endpoint="imageUploader"
                                    value={proofImage}
                                    onChange={(url) => setProofImage(url || "")}
                                />
                                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 opacity-0 has-[+*]:opacity-100 p-6">
                                    {/* This is a hacky way to style FileUpload if it doesn't support children render props nicely, 
                                        but generic FileUpload usually renders its own UI. 
                                        If FileUpload is the dropzone, we rely on its internal UI. 
                                        If I want custom UI as per mockup, I might need to customize FileUpload or wrap it differently.
                                        For now, I'll trust FileUpload to render a functional zone.
                                    */}
                                </div>
                            </div>
                        ) : (
                            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-black group">
                                <img src={proofImage} alt="Proof" className="w-full h-full object-cover" />
                                <button
                                    onClick={() => setProofImage("")}
                                    className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        )}

                        {/* Camera Controls Mockup (Visual only as FileUpload handles logic) */}
                        {!proofImage && (
                            <div className="flex items-center justify-center gap-8 pt-6 pb-2 opacity-50 pointer-events-none text-gray-400">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="size-12 rounded-full border flex items-center justify-center"><ImageIcon className="w-5 h-5" /></div>
                                    <span className="text-xs">Gallery</span>
                                </div>
                                <div className="size-20 rounded-full bg-primary/20 flex items-center justify-center text-primary"><Camera className="w-8 h-8" /></div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="size-12 rounded-full border flex items-center justify-center"><History className="w-5 h-5" /></div>
                                    <span className="text-xs">History</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-sm">Delivery Notes <span className="font-normal text-gray-500">(Optional)</span></span>
                        </div>
                        <Textarea
                            placeholder="e.g. Left at front desk with concierge..."
                            className="bg-surface-light dark:bg-surface-dark rounded-xl min-h-[100px]"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                </div>

                <div className="p-4 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-t border-gray-100 dark:border-gray-800">
                    <Button
                        onClick={handleComplete}
                        disabled={loading || !proofImage}
                        className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/20 gap-2"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Confirm Delivery
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    );
}
