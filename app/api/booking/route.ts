import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseISO, getDay, startOfDay } from 'date-fns';

/**
 * POST /api/booking
 * Entrada única para bots e integrações externas
 * Payload: { name, phone, date, time, professionalId, service, userId }
 */
export async function POST(request: Request) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.API_SECRET_TOKEN}`) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, phone, date: dateStr, time, professionalId, service, userId } = body;

        if (!userId || !professionalId || !dateStr || !time || !name || !phone) {
            return NextResponse.json({
                ok: false,
                message: "Faltam dados essenciais para o agendamento (Profissional, Data, Hora, Nome ou Telefone)."
            });
        }

        const date = parseISO(dateStr);
        const dayOfWeek = getDay(date);

        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return NextResponse.json({
                ok: false,
                message: "Sinto muito, a clínica não atende aos finais de semana. Por favor, escolha um dia útil."
            });
        }

        // --- MOTOR DE REGRAS CENTRALIZADO ---
        return await prisma.$transaction(async (tx) => {
            // 1. Verificar disponibilidade
            const conflict = await tx.appointment.findFirst({
                where: {
                    userId: userId,
                    professionalId: professionalId,
                    date: startOfDay(date),
                    time: time,
                    status: { not: 'canceled' }
                },
                include: { professional: true }
            });

            if (conflict) {
                return NextResponse.json({
                    ok: false,
                    message: `O ${conflict.professional.name} já possui um agendamento para este horário. Poderia escolher outro horário ou profissional?`
                });
            }

            // 2. Paciente
            let patient = await tx.patient.findFirst({
                where: { phone, userId }
            });

            if (!patient) {
                patient = await tx.patient.create({
                    data: { name, phone, userId }
                });
            }

            // 3. Criar Agendamento
            const appointment = await tx.appointment.create({
                data: {
                    userId,
                    patientId: patient.id,
                    professionalId,
                    date: startOfDay(date),
                    time,
                    service: service || 'Consulta Geral',
                    status: 'booked'
                },
                include: { professional: true }
            });

            return NextResponse.json({
                ok: true,
                message: `Perfeito! Seu agendamento com ${appointment.professional.name} para o dia ${dateStr} às ${time} foi confirmado com sucesso.`,
                data: appointment
            });
        });

    } catch (error: any) {
        return NextResponse.json({
            ok: false,
            message: "Houve um erro técnico ao registrar seu agendamento. Por favor, tente novamente em instantes."
        });
    }
}
