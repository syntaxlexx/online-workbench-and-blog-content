import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextURL } from "next/dist/server/web/next-url";

const redis = new Redis({
    url: process.env.REDIS_URL,
    token: process.env.REDIS_SECRET,
})

const rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(15, '1 h')
})

export default withAuth(async function middleware(req: NextRequestWithAuth) {
    const pathname = req.nextUrl.pathname; // relative path

    // manage rate limiting
    if (pathname.startsWith('/api')) {
        const ip = req.ip ?? '127.0.0.1'

        try {
            const { success } = await rateLimit.limit(ip)
            if (!success) {
                return NextResponse.json({
                    error: 'Too many requests!'
                })
            }

            return NextResponse.next();
        } catch (err) {
            return NextResponse.json({
                error: 'Internal server error'
            })
        }
    }

    // manage route protection
    const token = await getToken({ req })
    const isAuth = !!token

    const isAuthPage = pathname.startsWith('/login')
    const sensitiveRoutes = [
        '/dashboard'
    ];

    if (isAuthPage) {
        if (isAuth) {
            return NextResponse.redirect(new URL('/dashboard', req.url))
        }

        return null;
    }

    if (!isAuth && sensitiveRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
}, {
    callbacks: {
        // ensure the middleware above is always called
        async authorized() {
            return true
        }
    }
})

export const config = {
    matcher: [
        '/',
        '/login',
        '/dashboard/:path*',
        '/api/:path*',
    ]
}
