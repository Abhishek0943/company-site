import { NextResponse } from 'next/server';

export function proxy(request) {
    const adminToken = request.cookies.get('admin_token')?.value;
    const { pathname } = request.nextUrl;

    const isAuthenticated = adminToken === 'authenticated';

    // Protect /admin routes
    if (pathname.startsWith('/admin')) {
        if (!isAuthenticated) {
            const loginUrl = new URL('/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Protect mutating API routes for posts
    if (pathname.startsWith('/api/posts')) {
        // Only allow GET requests for unauthenticated users (for the public blog)
        if (request.method !== 'GET' && !isAuthenticated) {
            return NextResponse.json(
                { error: 'Unauthorized Action' },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/posts/:path*'],
};
