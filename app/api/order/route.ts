import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import OrderEmail from "@/components/emails/order-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log("Order API received:", data);

        // 1. Save to database (custom order without specific product)
        const orderNotes = JSON.stringify({
            productType: data.productType,
            occasion: data.occasion,
            recipientName: data.recipientName,
            senderName: data.senderName,
            message: data.message,
            customerName: data.name,
        });

        const order = await prisma.order.create({
            data: {
                status: 'PENDING_PAYMENT',
                totalAmount: 0,
                recipientName: data.recipientName || data.name,
                recipientPhone: data.phone,
                deliveryAddress: data.deliveryAddress,
                deliveryTime: data.deliveryDate ? new Date(data.deliveryDate) : new Date(),
            }
        });
        console.log("Order saved to DB:", order.id);

        // 2. Send Email (non-blocking)
        try {
            await resend.emails.send({
                from: 'HWest Florist <onboarding@resend.dev>',
                to: ['falitoeriano17@gmail.com'],
                subject: `New Order: ${order.id.slice(0, 8)}`,
                react: OrderEmail({
                    orderId: order.id,
                    customerName: data.name,
                    totalAmount: 0,
                    items: [{
                        productName: data.productType,
                        quantity: 1,
                        price: 0
                    }]
                })
            });
            console.log("Email sent successfully");
        } catch (emailError) {
            console.error("Email failed:", emailError);
        }

        // 3. Send n8n Webhook
        const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
        console.log("n8n webhook URL:", n8nWebhookUrl);

        if (n8nWebhookUrl) {
            try {
                const webhookResponse = await fetch(n8nWebhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        event: 'new_order',
                        orderId: order.id,
                        timestamp: new Date().toISOString(),
                        customer: {
                            name: data.name,
                            phone: data.phone,
                            address: data.deliveryAddress,
                        },
                        product: {
                            type: data.productType,
                            occasion: data.occasion,
                        },
                        delivery: {
                            date: data.deliveryDate,
                            recipientName: data.recipientName,
                            senderName: data.senderName,
                            message: data.message,
                            notes: data.notes,
                        },
                    }),
                });
                console.log("n8n webhook sent successfully, status:", webhookResponse.status);
            } catch (webhookError) {
                console.error("n8n webhook failed:", webhookError);
            }
        } else {
            console.log("N8N_WEBHOOK_URL not configured");
        }

        return NextResponse.json({ success: true, orderId: order.id });
    } catch (error) {
        console.error("Order API error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create order" },
            { status: 500 }
        );
    }
}
