import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseISO, getDay, startOfDay, endOfDay, format } from 'date-fns';
import { getAuthUser } from '@/lib/auth';

/**
 * GET /api/appointments?date=YYYY-MM-DD
 * Lista agendamentos do usuário logado
 */
export async function GET(request: Request) {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

    try {
        const { searchParams } = new URL(request.url);
        const dateStr = searchParams.get('date');

        let where: any = { userId: user.id };
        if (dateStr) {
            const date = parseISO(dateStr);
            where.date = {
                gte: startOfDay(date),
                lte: endOfDay(date)
            };
        }

        const appointments = await prisma.appointment.findMany({
            where,
            include: {
                patient: true,
                professional: true
            },
            orderBy: [{ date: 'asc' }, { time: 'asc' }]
        });

        const formatted = appointments.map(app => ({
            ...app,
            patientName: app.patient.name,
            patientPhone: app.patient.phone,
            professionalName: app.professional.name
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar agendamentos' }, { status: 500 });
    }
}

/**
 * POST /api/appointments
 * Criação atômica com validação de Professional + Data + Hora
 */
export async function POST(request: Request) {
    const user = await getAuthUser();

    // Suporte para n8n/IA externo via API_SECRET_TOKEN
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const isBot = token === process.env.API_SECRET_TOKEN;

    if (!user && !isBot) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, phone, date: dateStr, time, service, professionalId, userId: botUserId } = body;

        const finalUserId = user?.id || botUserId;
        if (!finalUserId) {
            return NextResponse.json({ error: 'userId ausente.' }, { status: 400 });
        }

        if (!name || !phone || !dateStr || !time || !professionalId) {
            return NextResponse.json({ error: 'Dados incompletos (name, phone, date, time, professionalId).' }, { status: 400 });
        }

        const date = parseISO(dateStr);
        const dayOfWeek = getDay(date);

        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return NextResponse.json({ error: 'Clínica fechada aos finais de semana.' }, { status: 400 });
        }

        // --- TRANSAÇÃO ATÔMICA ---
        return await prisma.$transaction(async (tx) => {
            // 1. Validar se o profissional está disponível nesse horário
            const conflict = await tx.appointment.findFirst({
                where: {
                    userId: finalUserId,
                    professionalId: professionalId,
                    date: startOfDay(date),
                    time: time,
                    status: { not: 'canceled' }
                }
            });

            if (conflict) {
                return NextResponse.json({
                    error: 'Este profissional já possui uma consulta neste horário.',
                    code: 'PROFESSIONAL_BUSY'
                }, { status: 409 });
            }

            // 2. Localizar ou Criar Paciente
            let patient = await tx.patient.findFirst({
                where: { phone, userId: finalUserId }
            });

            if (!patient) {
                patient = await tx.patient.create({
                    data: { name, phone, userId: finalUserId }
                });
            }

            // 3. Criar Agendamento
            const appointment = await tx.appointment.create({
                data: {
                    userId: finalUserId,
                    patientId: patient.id,
                    professionalId: professionalId,
                    date: startOfDay(date),
                    time,
                    service: service || 'Consulta Geral',
                    status: 'booked'
                },
                include: {
                    patient: true,
                    professional: true
                }
            });

            return NextResponse.json({
                success: true,
                appointment,
                message: `Agendamento confirmado para ${patient.name} com ${appointment.professional.name} às ${time}.`
            }, { status: 201 });
        });

    } catch (error: any) {
        console.error('[POST_APPOINTMENT_ERROR]', error.message);
        return NextResponse.json({ error: 'Erro interno ao processar agendamento' }, { status: 500 });
    }
}
