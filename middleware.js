import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    // 1. Proteger rota /painel
    if (pathname.startsWith('/painel')) {
        const token = req.cookies.get('admin_token')?.value;

        // Verificar se o token é válido
        const verified = token && await verifyToken(token);

        if (!verified) {
            // Se não tiver logado, manda pro login, salvando a URL de retorno
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    // 2. Se acessar login/setup já logado, manda pro painel
    if (pathname === '/login' || pathname === '/setup') {
        const token = req.cookies.get('admin_token')?.value;
        if (token && await verifyToken(token)) {
            return NextResponse.redirect(new URL('/painel', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/painel/:path*', '/login', '/setup'],
};
