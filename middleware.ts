import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export default auth((req) => {
    const { pathname } = req.nextUrl
    const isLoggedIn = !!req.auth

    // Public routes
    const isPublicRoute = pathname === '/' ||
        pathname.startsWith('/auth/') ||
        pathname.startsWith('/api/auth/') ||
        pathname.startsWith('/api/webhooks/')

    // Redirect logged-in users away from auth pages
    if (isLoggedIn && pathname.startsWith('/auth/')) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Protect dashboard routes
    if (!isLoggedIn && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    // Protect admin routes
    if (pathname.startsWith('/admin') && req.auth?.user?.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
})

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
