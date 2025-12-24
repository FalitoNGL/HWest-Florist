"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Eye, Printer, MapPin, User, Phone, Mail, Calendar, Clock, CreditCard, ChevronRight, CheckCircle, Truck, Package, X } from "lucide-react"
import { SerializedOrder, updateOrderStatus } from "@/app/actions/admin"
import { OrderStatus } from "@prisma/client"
import { toast } from "sonner"
import { ProofOfDeliveryDialog } from "./proof-of-delivery-dialog"
import { cn } from "@/lib/utils"

interface OrderDetailDialogProps {
    order: SerializedOrder;
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function OrderDetailDialog({ order, trigger, open, onOpenChange }: OrderDetailDialogProps) {
    const [loading, setLoading] = useState(false);
    const [showProofDialog, setShowProofDialog] = useState(false);

    const handleStatusUpdate = async (newStatus: OrderStatus) => {
        setLoading(true);
        try {
            const res = await updateOrderStatus(order.id, newStatus);
            if (res.success) {
                toast.success(`Order status updated to ${newStatus}`);
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const getNextStatus = (current: OrderStatus): OrderStatus | null => {
        switch (current) {
            case 'PENDING_PAYMENT': return 'PAID';
            case 'PAID': return 'IN_PRODUCTION';
            case 'IN_PRODUCTION': return 'ON_DELIVERY';
            case 'ON_DELIVERY': return 'COMPLETED';
            default: return null;
        }
    }

    const nextStatus = getNextStatus(order.status);

    const STEPS: OrderStatus[] = ['PENDING_PAYMENT', 'PAID', 'IN_PRODUCTION', 'ON_DELIVERY', 'COMPLETED'];
    const currentStepIndex = STEPS.indexOf(order.status);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger ? (
                <DialogTrigger asChild>
                    {trigger}
                </DialogTrigger>
            ) : (
                <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-muted-foreground hover:text-primary">
                        <Eye className="h-3 w-3 mr-1" /> View
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className="max-w-2xl max-h-[95vh] p-0 gap-0 overflow-hidden bg-background-light dark:bg-background-dark font-display">
                {/* Header */}
                <div className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <DialogTitle className="text-lg font-bold leading-tight tracking-tight text-center flex-1">
                        Order #{order.id.slice(0, 8)}
                    </DialogTitle>
                    <DialogTrigger asChild>
                        <button className="flex items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors absolute right-2">
                            <X className="w-5 h-5" />
                        </button>
                    </DialogTrigger>
                </div>

                <div className="overflow-y-auto p-4 space-y-4 pb-24">
                    {/* Status Card */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Current Status</span>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{order.status.replace(/_/g, " ")}</h2>
                            </div>
                        </div>
                        {/* Stepper */}
                        <div className="flex w-full flex-col gap-2">
                            <div className="flex w-full flex-row items-center justify-between gap-1">
                                {STEPS.map((step, idx) => (
                                    <div
                                        key={step}
                                        className={cn(
                                            "h-2 flex-1 rounded-full transition-colors",
                                            idx <= currentStepIndex ? "bg-primary" : "bg-gray-200 dark:bg-gray-700",
                                            idx === currentStepIndex && "shadow-[0_0_8px_rgba(19,236,91,0.6)]"
                                        )}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between text-[10px] font-medium text-gray-400 dark:text-gray-500 mt-1 px-1">
                                <span>Ordered</span>
                                <span>Paid</span>
                                <span>Making</span>
                                <span>Driver</span>
                                <span>Done</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Toggle (Simulated) */}
                    <div className="flex h-12 w-full items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-900 p-1">
                        {['PENDING_PAYMENT', 'PAID'].map((status) => (
                            <button
                                key={status}
                                onClick={() => status === 'PAID' && order.status === 'PENDING_PAYMENT' ? handleStatusUpdate('PAID') : null} // Only allow Paid toggle for now
                                className={cn(
                                    "flex h-full grow items-center justify-center rounded-lg text-sm font-bold transition-all",
                                    order.status === status || (status === 'PAID' && ['IN_PRODUCTION', 'ON_DELIVERY', 'COMPLETED'].includes(order.status))
                                        ? "bg-white dark:bg-surface-dark shadow-sm text-primary-content dark:text-primary"
                                        : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                {status === 'PAID' && <CheckCircle className="w-4 h-4 mr-1" />}
                                {status === 'PENDING_PAYMENT' ? 'Unpaid' : 'Paid'}
                            </button>
                        ))}
                    </div>

                    {/* Delivery Details */}
                    <div>
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight px-1 pb-3">Delivery Details</h3>
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                            <div className="p-4 space-y-4">
                                <div className="flex gap-3 items-start">
                                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shrink-0">
                                        <MapPin className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Destination</p>
                                        <p className="font-bold text-slate-900 dark:text-white">{order.recipientName}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{order.deliveryAddress}</p>
                                    </div>
                                </div>
                                <div className="h-px bg-gray-100 dark:bg-gray-700 w-full"></div>
                                <div className="flex gap-4 pt-1">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-white/5 px-3 py-2 rounded-lg flex-1">
                                        <Calendar className="w-4 h-4" />
                                        <span className="font-medium">{format(new Date(order.deliveryTime), 'MMM d')}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-white/5 px-3 py-2 rounded-lg flex-1">
                                        <Clock className="w-4 h-4" />
                                        <span className="font-medium">{format(new Date(order.deliveryTime), 'p')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items */}
                    <div>
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight px-1 pb-3">Items</h3>
                        <div className="flex flex-col gap-3">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="bg-surface-light dark:bg-surface-dark rounded-xl p-3 shadow-sm flex gap-3 border border-gray-100 dark:border-gray-800">
                                    <div className="size-16 rounded-lg bg-gray-100 dark:bg-gray-800 bg-cover bg-center shrink-0"
                                        style={{ backgroundImage: `url('${item.image || '/placeholder.png'}')` }}></div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">{item.productName}</h4>
                                            <span className="font-bold text-sm text-slate-900 dark:text-white">Rp {Number(item.price).toLocaleString("id-ID")}</span>
                                        </div>
                                        <div className="mt-1 text-xs font-semibold text-gray-500 bg-gray-100 dark:bg-white/10 self-start px-2 py-0.5 rounded">Qty: {item.quantity}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Totals */}
                    <div className="mt-4 px-2 space-y-1">
                        <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                            <span>Total</span>
                            <span className="text-primary">Rp {Number(order.totalAmount).toLocaleString("id-ID")}</span>
                        </div>
                    </div>

                    {/* Proof of Delivery (If completed) */}
                    {order.status === 'COMPLETED' && ( // In real app, check proofPhotoUrl if available
                        <div>
                            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight px-1 pb-3">Proof of Delivery</h3>
                            <div className="w-full h-40 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                                <span className="text-sm">Proof Image Placeholder (Backend doesn't provide URL yet in SerializedOrder)</span>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer Actions */}
                <div className="absolute bottom-0 left-0 w-full bg-white dark:bg-background-dark border-t border-gray-200 dark:border-gray-800 p-4 z-40">
                    <div className="flex gap-3">
                        <a href={`/admin/invoice/${order.id}`} target="_blank" rel="noopener noreferrer" className="flex-1">
                            <Button variant="outline" className="w-full h-12 font-bold">
                                <Printer className="w-4 h-4 mr-2" /> Invoice
                            </Button>
                        </a>
                        {nextStatus === 'COMPLETED' ? (
                            <Button
                                className="flex-[2] h-12 font-bold text-base shadow-md"
                                onClick={() => setShowProofDialog(true)}
                            >
                                Complete Order
                            </Button>
                        ) : nextStatus ? (
                            <Button
                                className="flex-[2] h-12 font-bold text-base shadow-md"
                                onClick={() => handleStatusUpdate(nextStatus)}
                                disabled={loading}
                            >
                                Move to {nextStatus.replace("_", " ")}
                            </Button>
                        ) : null}
                    </div>
                </div>

                <ProofOfDeliveryDialog
                    order={order}
                    open={showProofDialog}
                    onOpenChange={setShowProofDialog}
                />

            </DialogContent>
        </Dialog>
    )
}
