import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Public routes that don't require authentication
    const isPublicRoute = pathname === '/' ||
        pathname.startsWith('/auth/') ||
        pathname.startsWith('/api/auth/') ||
        pathname.startsWith('/api/webhooks/') ||
        pathname.startsWith('/_next/') ||
        pathname.startsWith('/static/') ||
        pathname.includes('.')

    // Allow public routes
    if (isPublicRoute) {
        return NextResponse.next()
    }

    // For protected routes, let NextAuth handle authentication
    // The actual auth check happens in the page/API route
    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
