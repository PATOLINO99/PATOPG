import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'zapscale_default_secret_key_2026'
);

export async function GET() {
    try {
        const token = cookies().get('auth_token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });
        }

        const { payload } = await jwtVerify(token, JWT_SECRET);
        const userId = payload.userId as string;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true }
        });

        if (!user) {
            return NextResponse.json({ error: 'Usuário não encontrado.' }, { status: 404 });
        }

        return NextResponse.json({ user });

    } catch (error: any) {
        return NextResponse.json({ error: 'Sessão inválida ou expirada.' }, { status: 401 });
    }
}
