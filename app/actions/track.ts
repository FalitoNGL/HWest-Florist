'use server'

import { prisma } from "@/lib/prisma";

export async function trackOrder(orderId: string) {
    if (!orderId) {
        return { success: false, error: "Order ID is required" };
    }

    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                items: true,
                delivery: true, // To get status and proof photo
            }
        });

        if (!order) {
            return { success: false, error: "Order not found" };
        }

        return { success: true, data: order };
    } catch (error) {
        console.error("Tracking Error:", error);
        return { success: false, error: "System error" };
    }
}
