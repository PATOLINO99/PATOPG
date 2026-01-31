import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../../lib/auth';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const count = await prisma.admin.count();

        // Se já tiver admin, bloqueia (segurança)
        if (count > 0) {
            return NextResponse.json({ error: 'Sistema já configurado.' }, { status: 403 });
        }

        const { password } = await req.json();

        if (!password || password.length < 4) {
            return NextResponse.json({ error: 'Senha muito curta.' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await prisma.admin.create({
            data: {
                password: hashedPassword,
                username: 'admin'
            }
        });

        const token = await signToken({ id: admin.id, role: 'admin' });

        const response = NextResponse.json({ success: true, message: 'Configurado com sucesso!' });

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
        return NextResponse.json({ error: 'Erro ao configurar.' }, { status: 500 });
    }
}
