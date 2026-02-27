import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

/**
 * DELETE /api/appointments/:id
 * Cancela um agendamento (Valida se pertence ao usuário)
 */
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

    try {
        const { id } = params;

        // Validar se o agendamento pertence ao usuário logado
        const appointment = await prisma.appointment.findFirst({
            where: { id, userId: user.id }
        });

        if (!appointment) {
            return NextResponse.json({ error: 'Agendamento não encontrado ou acesso negado.' }, { status: 404 });
        }

        const updated = await prisma.appointment.update({
            where: { id },
            data: { status: 'canceled' }
        });

        return NextResponse.json({
            success: true,
            message: 'Agendamento cancelado com sucesso.',
            appointment: updated
        });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao cancelar agendamento' }, { status: 500 });
    }
}

/**
 * PATCH /api/appointments/:id
 * Reagenda ou altera status (Garante isolamento por usuário)
 */
export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

    try {
        const { id } = params;
        const body = await request.json();
        const { date, time, status, service } = body;

        // Validar propriedade
        const existing = await prisma.appointment.findFirst({
            where: { id, userId: user.id }
        });

        if (!existing) {
            return NextResponse.json({ error: 'Agendamento não encontrado.' }, { status: 404 });
        }

        // Se houver troca de horário, verificar novo conflito NO MESMO USUÁRIO
        if (date && time) {
            const conflict = await prisma.appointment.findFirst({
                where: {
                    userId: user.id,
                    id: { not: id },
                    date: new Date(date),
                    time,
                    status: { not: 'canceled' }
                }
            });

            if (conflict) {
                return NextResponse.json({ error: 'Novo horário escolhido já está ocupado em sua agenda.' }, { status: 409 });
            }
        }

        const updated = await prisma.appointment.update({
            where: { id },
            data: {
                ...(date && { date: new Date(date) }),
                ...(time && { time }),
                ...(status && { status }),
                ...(service && { service }),
                updatedAt: new Date()
            }
        });

        return NextResponse.json({
            success: true,
            appointment: updated
        });

    } catch (error) {
        return NextResponse.json({ error: 'Erro ao atualizar agendamento' }, { status: 500 });
    }
}
