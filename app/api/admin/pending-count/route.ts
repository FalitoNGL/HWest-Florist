import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const count = await prisma.order.count({
            where: {
                status: {
                    in: ['PENDING_PAYMENT', 'DESIGN_DRAFT', 'WAITING_APPROVAL']
                }
            }
        });

        return NextResponse.json({ count });
    } catch {
        return NextResponse.json({ count: 0 });
    }
}
