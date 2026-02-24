import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/appointments/webhook
 * Recebe atualizações do WhatsApp (Confirmar/Cancelar)
 * Payload esperado: { appointmentId: "uuid", action: "confirm" | "cancel" }
 */
export async function POST(request: Request) {
    // Proteção simples via Header Secret
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.API_SECRET_TOKEN}`) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { appointmentId, action } = body;

        if (!appointmentId || !action) {
            return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
        }

        const status = action === 'confirm' ? 'confirmed' : 'canceled';
        const confirmedViaWhatsapp = action === 'confirm';

        const updated = await prisma.appointment.update({
            where: { id: appointmentId },
            data: {
                status,
                confirmedViaWhatsapp,
                updatedAt: new Date()
            }
        });

        console.log(`[WHATSAPP_WEBHOOK] Agendamento ${appointmentId} atualizado para ${status}`);

        return NextResponse.json({
            success: true,
            message: `Status atualizado para ${status}`,
            appointment: updated
        });

    } catch (error) {
        return NextResponse.json({ error: 'Erro ao processar webhook' }, { status: 500 });
    }
}
