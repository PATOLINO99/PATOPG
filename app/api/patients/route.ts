import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

/**
 * GET /api/patients
 * Retorna lista de pacientes do usuário logado com resumo de agendamentos
 */
export async function GET() {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

    try {
        const patients = await prisma.patient.findMany({
            where: { userId: user.id },
            include: {
                appointments: {
                    orderBy: { date: 'desc' },
                    take: 1
                }
            },
            orderBy: { name: 'asc' }
        });

        // Formatar para o frontend (incluindo info do último agendamento)
        const formatted = patients.map(p => ({
            id: p.id,
            name: p.name,
            phone: p.phone,
            lastVisit: p.appointments[0]?.date || p.createdAt,
            service: p.appointments[0]?.service || 'Nenhum',
            status: p.appointments[0]?.status || 'sem_registro',
            appointmentCount: 0 // Poderia ser um count via prisma se necessário
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar pacientes' }, { status: 500 });
    }
}

/**
 * POST /api/patients
 * Cria um novo paciente manualmente
 */
export async function POST(request: Request) {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

    try {
        const body = await request.json();
        const { name, phone } = body;

        if (!name || !phone) {
            return NextResponse.json({ error: 'Nome e telefone são obrigatórios' }, { status: 400 });
        }

        const patient = await prisma.patient.create({
            data: {
                name,
                phone,
                userId: user.id
            }
        });

        return NextResponse.json(patient, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao criar paciente' }, { status: 500 });
    }
}
