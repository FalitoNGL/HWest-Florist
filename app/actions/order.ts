'use server'

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { Resend } from "resend";
import OrderEmail from "@/components/emails/order-email";

const resend = new Resend(process.env.RESEND_API_KEY);

// Validation Schema matches the Form
const orderSchema = z.object({
    productId: z.string(),
    productName: z.string(),
    productType: z.string(),
    // Delivery
    recipientName: z.string().min(1, "Recipient name is required"),
    recipientPhone: z.string().min(1, "Recipient phone is required"),
    deliveryAddress: z.string().min(5, "Address MUST be detailed"),
    deliveryTime: z.date(),
    // Dynamic Fields
    senderName: z.string().optional(),
    targetName: z.string().optional(),
    greetingType: z.string().optional(),
    cardMessage: z.string().optional(),
    notes: z.string().optional(),
});

export async function createOrder(prevState: unknown, formData: FormData) {
    // 1. Extract Data
    const rawData = {
        productId: formData.get('productId'),
        productName: formData.get('productName'),
        productType: formData.get('productType'),
        recipientName: formData.get('recipientName'),
        recipientPhone: formData.get('recipientPhone'),
        deliveryAddress: formData.get('deliveryAddress'),
        deliveryTime: formData.get('deliveryTime') ? new Date(formData.get('deliveryTime') as string) : undefined,
        senderName: formData.get('senderName'),
        targetName: formData.get('targetName'),
        greetingType: formData.get('greetingType'),
        cardMessage: formData.get('cardMessage'),
        notes: formData.get('notes'),
    };

    // 2. Validate
    const validated = orderSchema.safeParse(rawData);

    if (!validated.success) {
        return {
            message: "Validation Error",
            errors: validated.error.flatten().fieldErrors,
        };
    }

    const data = validated.data;
    const WA_PHONE = process.env.NEXT_PUBLIC_WA_PHONE || "6282169512800";

    try {
        // 3. Save to DB (Hybrid Approach: Save for stats, but rely on WA for actual order)
        // We wrap in try-catch so DB failure doesn't block the WA redirect
        // This is "Optional Persistence" as requested by "cukup wa dulu" but keeping data safe
        const order = await prisma.order.create({
            data: {
                status: 'PENDING_PAYMENT',
                totalAmount: 0, // Pending calculation/negotiation on WA
                recipientName: data.recipientName,
                recipientPhone: data.recipientPhone,
                deliveryAddress: data.deliveryAddress,
                deliveryTime: data.deliveryTime,
                items: {
                    create: {
                        productId: data.productId,
                        quantity: 1,
                        price: 0, // Placeholder
                        greetingType: data.greetingType,
                        targetName: data.targetName,
                        senderName: data.senderName,
                        cardMessage: data.cardMessage,
                        notes: data.notes
                    }
                }
            }
        });
        console.log("Order saved to DB:", order.id);

        // 3.5 Send Email Notification
        await resend.emails.send({
            from: 'HWest Florist <onboarding@resend.dev>', // Free tier default
            to: ['falitoeriano17@gmail.com'], // Updated to user's email
            subject: `New Order: ${order.id.slice(0, 8)}`,
            react: OrderEmail({
                orderId: order.id,
                customerName: data.recipientName, // Ideally sender, but recipient is mandatory field
                totalAmount: 0,
                items: [{
                    productName: data.productName,
                    quantity: 1,
                    price: 0
                }]
            })
        });

    } catch (error) {
        console.error("DB/Email Failed:", error);
        // We continue to WA even if DB fails
    }

    // 4. Format WhatsApp Message
    const dateStr = format(data.deliveryTime, 'dd MMM yyyy HH:mm');

    let customText = "";
    if (data.productType === 'BOARD_FLOWER') {
        customText = `
*Header*: ${data.greetingType || '-'}
*Text*: ${data.targetName || '-'}
*From*: ${data.senderName || '-'}`;
    } else {
        customText = `
*Card Message*: ${data.cardMessage || '-'}`;
    }

    const message = `Halo HWest, saya mau pesan via Web:

*Item*: ${data.productName}
*Date*: ${dateStr}
${customText}

*Delivery To*:
Name: ${data.recipientName}
Phone: ${data.recipientPhone}
Address: ${data.deliveryAddress}

*Notes*: ${data.notes || '-'}`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${WA_PHONE}?text=${encodedMessage}`;

    // 5. Redirect
    redirect(waUrl);
}
