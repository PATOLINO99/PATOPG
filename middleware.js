import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

/**
 * Middleware de Segurança ZapScale
 * Protege rotas de UI e API, além de injetar headers de segurança.
 */
export async function middleware(req) {
    const { pathname } = req.nextUrl;
    const response = NextResponse.next();

    // --- 1. HEADERS DE SEGURANÇA (Global) ---
    const securityHeaders = {
        'X-DNS-Prefetch-Control': 'on',
        'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
        'X-XSS-Protection': '1; mode=block',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://connect.facebook.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://*.fbcdn.net https://*.facebook.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.facebook.com;"
    };

    Object.entries(securityHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    // --- 2. PROTEÇÃO DE ROTAS SENSÍVEIS (API & UI) ---

    // Lista de rotas públicas de API
    const isPublicApi =
        pathname === '/api/auth/login' ||
        pathname === '/api/auth/setup' ||
        pathname === '/api/auth/status' ||
        pathname === '/api/leads/webhook' ||
        (pathname === '/api/config' && req.method === 'GET') ||
        (pathname === '/api/products' && req.method === 'GET');

    const isSensitivePath = pathname.startsWith('/painel') || (pathname.startsWith('/api') && !isPublicApi);

    if (isSensitivePath) {
        const token = req.cookies.get('admin_token')?.value;
        const verified = token && await verifyToken(token);

        if (!verified) {
            // Se for API, retorna 401. Se for UI, redireciona para login.
            if (pathname.startsWith('/api')) {
                return new NextResponse(
                    JSON.stringify({ error: 'Não autorizado. Sessão expirada ou inválida.' }),
                    { status: 401, headers: { 'Content-Type': 'application/json' } }
                );
            }
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    // --- 3. PREVENÇÃO DE ACESSO AO LOGIN SE JÁ LOGADO ---
    if (pathname === '/login' || pathname === '/setup') {
        const token = req.cookies.get('admin_token')?.value;
        if (token && await verifyToken(token)) {
            return NextResponse.redirect(new URL('/painel', req.url));
        }
    }

    return response;
}

export const config = {
    matcher: [
        '/painel/:path*',
        '/api/:path*',
        '/login',
        '/setup'
    ],
};
