import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../../lib/auth';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { password } = await req.json();

        // Pega o primeiro admin (sistema single-user)
        const admin = await prisma.admin.findFirst();

        if (!admin) {
            return NextResponse.json({ error: 'Sistema não configurado.' }, { status: 404 });
        }

        const isValid = await bcrypt.compare(password, admin.password);

        if (!isValid) {
            return NextResponse.json({ error: 'Senha incorreta.' }, { status: 401 });
        }

        const token = await signToken({ id: admin.id, role: 'admin' });

        const response = NextResponse.json({ success: true });

        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 // 1 dia
        });

        return response;

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Erro no login.' }, { status: 500 });
    }
}
