'use server';

import { cookies } from 'next/headers';

export async function setAdminSession(password: string) {
    // Hardcoded password for now - acceptable for MVP
    // In production, use env variable: process.env.ADMIN_PASSWORD
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

    if (password === ADMIN_PASSWORD) {
        const cookieStore = await cookies();
        cookieStore.set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });
        return true;
    }
    return false;
}
