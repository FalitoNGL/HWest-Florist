'use client'

import { Order, OrderStatus } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { format } from "date-fns";
import { updateOrderStatus, completeOrder } from "@/app/actions/admin";
import { useTransition } from "react";
import { toast } from "sonner";
import { ArrowRight, CheckCircle, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { OrderDetailDialog } from "@/components/admin/order-detail-dialog";

interface KanbanColumnProps {
    title: string;
    count: number;
    status: string;
    orders: any[]; // Using any for joined relation
}

export function KanbanColumn({ title, count, orders }: KanbanColumnProps) {
    const [isPending, startTransition] = useTransition();

    const handleStatusMove = (orderId: string, nextStatus: OrderStatus) => {
        startTransition(async () => {
            const res = await updateOrderStatus(orderId, nextStatus);
            if (res.success) {
                toast.success("Status updated");
            } else {
                toast.error("Failed to update");
            }
        });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, orderId: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size too large (max 5MB)");
            return;
        }

        toast.loading("Uploading proof...", { id: 'upload-proof' });

        const reader = new FileReader();
        reader.onload = async (ev) => {
            const base64 = ev.target?.result as string;
            startTransition(async () => {
                const res = await completeOrder(orderId, base64);
                toast.dismiss('upload-proof');
                if (res.success) {
                    toast.success("Order Completed with Proof!");
                } else {
                    toast.error("Failed to complete order");
                }
            });
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex-1 flex flex-col bg-muted/50 rounded-lg border h-fit max-h-full">
            <div className="p-4 border-b flex justify-between items-center bg-background/50 backdrop-blur rounded-t-lg sticky top-0 z-10">
                <h3 className="font-semibold">{title}</h3>
                <Badge variant="secondary">{count}</Badge>
            </div>
            <div className="p-2 space-y-2 overflow-y-auto min-h-[200px]">
                {orders.map((order) => (
                    <Card key={order.id} className="cursor-pointer hover:border-primary transition-colors">
                        <CardHeader className="p-3 pb-2">
                            <div className="flex justify-between items-start mb-2">
                                <Badge variant="outline" className="text-xs max-w-[120px] truncate">{order.items[0]?.productName || 'Item'}</Badge>
                                <OrderDetailDialog order={order} />
                            </div>
                            <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                                <span>{format(new Date(order.deliveryTime), 'dd/MM HH:mm')}</span>
                            </div>
                            <CardTitle className="text-sm font-medium leading-tight">
                                {order.recipientName}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0 text-xs text-muted-foreground">
                            {order.deliveryAddress}
                        </CardContent>
                        <CardFooter className="p-2 pt-0 flex justify-end gap-2">
                            {/* Logic for Next Step */}
                            {order.status === 'PENDING_PAYMENT' && (
                                <Button size="sm" variant="outline" className="w-full h-8 text-xs" onClick={() => handleStatusMove(order.id, 'IN_PRODUCTION')}>
                                    Approve <ArrowRight className="ml-2 h-3 w-3" />
                                </Button>
                            )}
                            {['IN_PRODUCTION', 'DESIGN_DRAFT', 'WAITING_APPROVAL'].includes(order.status) && (
                                <Button size="sm" variant="outline" className="w-full h-8 text-xs" onClick={() => handleStatusMove(order.id, 'ON_DELIVERY')}>
                                    Ship <ArrowRight className="ml-2 h-3 w-3" />
                                </Button>
                            )}
                            {['ON_DELIVERY'].includes(order.status) && (
                                <div className="w-full">
                                    <input
                                        type="file"
                                        id={`proof-${order.id}`}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e, order.id)}
                                    />
                                    <label
                                        htmlFor={`proof-${order.id}`}
                                        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full h-8 text-xs bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 cursor-pointer")}
                                    >
                                        Proof & Complete <Upload className="ml-2 h-3 w-3" />
                                    </label>
                                </div>
                            )}
                            {order.status === 'COMPLETED' && (
                                <div className="text-xs text-primary flex items-center gap-1 font-medium">
                                    Done <CheckCircle className="h-3 w-3" />
                                </div>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
