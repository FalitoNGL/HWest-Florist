import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Check if accessing admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const isAdmin = request.cookies.get('admin_session');

        if (!isAdmin) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Redirect to dashboard if already logged in and visiting login
    if (request.nextUrl.pathname === '/login') {
        const isAdmin = request.cookies.get('admin_session');
        if (isAdmin) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}
