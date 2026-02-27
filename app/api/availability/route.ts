import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseISO, startOfDay, endOfDay, getDay } from 'date-fns';
import { getAuthUser } from '@/lib/auth';

/**
 * GET /api/availability?date=YYYY-MM-DD&professionalId=UUID
 * Verifica horários livres de um profissional específico
 */
export async function GET(request: Request) {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

    try {
        const { searchParams } = new URL(request.url);
        const dateStr = searchParams.get('date');
        const professionalId = searchParams.get('professionalId');

        if (!dateStr || !professionalId) {
            return NextResponse.json({ error: 'Data e ProfessionalId são obrigatórios' }, { status: 400 });
        }

        const date = parseISO(dateStr);
        const dayOfWeek = getDay(date);

        // Bloqueio de final de semana
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return NextResponse.json({ slots: [], message: 'Clínica fechada aos finais de semana.' });
        }

        // Horários Disponíveis (1 por hora, ou conforme configurado)
        const allSlots = [
            '08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
        ];

        // Buscar agendamentos do profissional NESSE dia, que não estejam cancelados
        const busySlots = await prisma.appointment.findMany({
            where: {
                userId: user.id,
                professionalId: professionalId,
                date: {
                    gte: startOfDay(date),
                    lte: endOfDay(date)
                },
                status: { not: 'canceled' }
            },
            select: { time: true }
        });

        const busyTimes = busySlots.map(s => s.time);
        const availableSlots = allSlots.filter(time => !busyTimes.includes(time));

        return NextResponse.json({ slots: availableSlots });

    } catch (error) {
        return NextResponse.json({ error: 'Erro ao verificar disponibilidade' }, { status: 500 });
    }
}
