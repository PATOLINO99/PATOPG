import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken, COOKIE_OPTIONS } from '../../../../lib/auth';

/**
 * Rota de Setup Hardened
 * Impede re-configuração e força políticas de senha forte.
 */
export async function POST(req) {
    try {
        const count = await prisma.admin.count();

        // Bloqueio Total: Se já existir um admin, qualquer tentativa é negada (Forbidden)
        if (count > 0) {
            console.error('[SECURITY] Tentativa de re-configurar sistema já ativo!');
            return NextResponse.json({ error: 'Operação não permitida. O sistema já está configurado.' }, { status: 403 });
        }

        const body = await req.json();
        const password = String(body.password || '').trim();

        // Política de Senha Forte: Mínimo 12 caracteres, deve conter números e letras
        const securePasswordRegex = /^(?=.*[A-Za-z])(?=.*\d).{12,}$/;

        if (!securePasswordRegex.test(password)) {
            return NextResponse.json({
                error: 'Senha muito fraca. Mínimo de 12 caracteres, contendo pelo menos 1 letra e 1 número.'
            }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12); // Aumentado salt rounds para 12

        const admin = await prisma.admin.create({
            data: {
                password: hashedPassword,
                username: 'admin'
            }
        });

        const token = await signToken({
            id: admin.id,
            role: 'admin',
            jti: crypto.randomUUID()
        });

        const response = NextResponse.json({
            success: true,
            message: 'Administrador configurado com sucesso! Bem-vindo.'
        });

        // Cookies de sessão inicial configurados com segurança máxima
        response.cookies.set('admin_token', token, COOKIE_OPTIONS);

        return response;

    } catch (error) {
        console.error('[SETUP_ERROR]', error.message);
        return NextResponse.json({ error: 'Erro crítico ao configurar administrador.' }, { status: 500 });
    }
}
