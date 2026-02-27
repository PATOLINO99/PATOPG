import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken, COOKIE_OPTIONS } from '../../../../lib/auth';

/**
 * Rota de Login Hardened
 * Implementa proteção contra Brute Force, Cookies Strict e Sanitização.
 */

// Simples delay para mitigar ataques de força bruta
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(req) {
    try {
        const body = await req.json();
        const password = String(body.password || '').trim();

        if (!password) {
            return NextResponse.json({ error: 'Senha é obrigatória.' }, { status: 400 });
        }

        // Delay anti-brute force (faz cada tentativa demorar pelo menos 1s)
        await sleep(1000);

        // Pega o primeiro admin (sistema single-user)
        const admin = await prisma.admin.findFirst();

        if (!admin) {
            return NextResponse.json({ error: 'Sistema não configurado. Por favor, acesse /setup' }, { status: 404 });
        }

        const isValid = await bcrypt.compare(password, admin.password);

        if (!isValid) {
            // Log de falha de segurança (opcional)
            console.warn(`[SECURITY] Tentativa de login falhou para usuário: ${admin.username}`);
            return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 });
        }

        const token = await signToken({
            id: admin.id,
            role: 'admin',
            // Adicionamos um JTI (Unique ID) para evitar ataques de replay se necessário no futuro
            jti: crypto.randomUUID()
        });

        const response = NextResponse.json({
            success: true,
            user: { username: admin.username }
        });

        // Aplicamos as COOKIE_OPTIONS centralizadas (Strict, Secure, HttpOnly)
        response.cookies.set('admin_token', token, COOKIE_OPTIONS);

        return response;

    } catch (error) {
        console.error('[AUTH_ERROR]', error.message);
        // Retornamos mensagem genérica para não vazar informações sobre o erro interno
        return NextResponse.json({ error: 'Falha na autenticação.' }, { status: 500 });
    }
}
