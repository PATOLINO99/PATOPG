import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

/**
 * GET /api/professionals
 * Lista profissionais vinculados à conta do usuário logado
 */
export async function GET() {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

    try {
        const professionals = await prisma.professional.findMany({
            where: { userId: user.id, active: true },
            orderBy: { name: 'asc' }
        });

        return NextResponse.json(professionals);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar profissionais' }, { status: 500 });
    }
}

/**
 * POST /api/professionals
 * Cadastra um novo profissional
 */
export async function POST(request: Request) {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

    try {
        const body = await request.json();
        const { name } = body;

        if (!name) {
            return NextResponse.json({ error: 'Nome é obrigatório' }, { status: 400 });
        }

        const professional = await prisma.professional.create({
            data: {
                name,
                userId: user.id,
                active: true
            }
        });

        return NextResponse.json(professional, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao criar profissional' }, { status: 500 });
    }
}
