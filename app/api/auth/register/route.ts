import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: 'Email já cadastrado.' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json({
            message: 'Usuário cadastrado com sucesso.',
            user: { id: user.id, name: user.name, email: user.email }
        }, { status: 201 });

    } catch (error: any) {
        console.error('[REGISTER_ERROR]', error.message);
        return NextResponse.json({ error: 'Erro ao cadastrar usuário.' }, { status: 500 });
    }
}
