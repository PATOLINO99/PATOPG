import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'zapscale_default_secret_key_2026'
);

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Proteger rotas do Painel
    if (pathname.startsWith('/painel')) {
        const token = request.cookies.get('auth_token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            await jwtVerify(token, JWT_SECRET);
            return NextResponse.next();
        } catch (err) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Se o usuário já estiver logado, não precisa ver login/register
    if (pathname === '/login' || pathname === '/register') {
        const token = request.cookies.get('auth_token')?.value;
        if (token) {
            try {
                await jwtVerify(token, JWT_SECRET);
                return NextResponse.redirect(new URL('/painel', request.url));
            } catch (err) { }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/painel/:path*', '/login', '/register'],
};
