import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const { currentPassword, newPassword } = await request.json();

        // Verify user is logged in
        const cookieStore = await cookies();
        const adminToken = cookieStore.get("admin_token");

        if (!adminToken) {
            return NextResponse.json(
                { error: "Tidak terautentikasi" },
                { status: 401 }
            );
        }

        // Get current password from environment or database
        const envPassword = process.env.ADMIN_PASSWORD;

        // Check if current password matches
        // For simple auth, we compare directly. For bcrypt, use bcrypt.compare
        let isValidCurrentPassword = false;

        // First check if stored as plain text (from env)
        if (envPassword && currentPassword === envPassword) {
            isValidCurrentPassword = true;
        }

        // Also check if stored as hash in database
        const storedHash = await prisma.storeConfig.findUnique({
            where: { key: "ADMIN_PASSWORD_HASH" }
        });

        if (storedHash?.value) {
            isValidCurrentPassword = await bcrypt.compare(currentPassword, storedHash.value);
        }

        if (!isValidCurrentPassword) {
            return NextResponse.json(
                { error: "Password saat ini salah" },
                { status: 400 }
            );
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Store new password hash in database
        await prisma.storeConfig.upsert({
            where: { key: "ADMIN_PASSWORD_HASH" },
            update: { value: hashedPassword },
            create: { key: "ADMIN_PASSWORD_HASH", value: hashedPassword }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Change password error:", error);
        return NextResponse.json(
            { error: "Gagal mengubah password" },
            { status: 500 }
        );
    }
}
