'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getStoreConfig(key: string) {
    try {
        const config = await prisma.storeConfig.findUnique({
            where: { key }
        });
        return { success: true, value: config?.value };
    } catch (error) {
        return { success: false, error: "Failed to get config" };
    }
}

export async function updateStoreConfig(key: string, value: string) {
    try {
        await prisma.storeConfig.upsert({
            where: { key },
            update: { value },
            create: { key, value }
        });

        // Revalidate all pages since config (like WA number) might be global
        revalidatePath('/', 'layout');
        return { success: true };
    } catch (error) {
        console.error("Update config error:", error);
        return { success: false, error: "Failed to update config" };
    }
}
