import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { format, subDays, startOfDay } from 'date-fns';

export async function GET() {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Acesso negado.' }, { status: 401 });

    try {
        // 1. Total Faturado do Usuário (Soma das vendas aprovadas)
        const totalResult = await prisma.lead.aggregate({
            where: {
                userId: user.id,
                status_pagamento: 'Aprovado'
            },
            _sum: { valor_venda: true }
        });

        const totalFaturado = totalResult._sum.valor_venda || 0;

        // 2. Últimos 10 Leads do Usuário
        const leads = await prisma.lead.findMany({
            where: { userId: user.id },
            orderBy: { data_criacao: 'desc' },
            take: 10
        });

        // 3. Gráfico de Vendas (Últimos 7 dias)
        const sevenDaysAgo = startOfDay(subDays(new Date(), 7));
        const approvedLeads = await prisma.lead.findMany({
            where: {
                userId: user.id,
                status_pagamento: 'Aprovado',
                data_criacao: { gte: sevenDaysAgo }
            },
            select: {
                valor_venda: true,
                data_criacao: true
            }
        });

        // Agrupar por dia
        const chartDataMap = new Map();
        for (let i = 0; i < 7; i++) {
            const dateKey = format(subDays(new Date(), i), 'dd/MM');
            chartDataMap.set(dateKey, 0);
        }

        approvedLeads.forEach(lead => {
            const dateKey = format(lead.data_criacao, 'dd/MM');
            if (chartDataMap.has(dateKey)) {
                chartDataMap.set(dateKey, chartDataMap.get(dateKey) + lead.valor_venda);
            }
        });

        const graficoVendas = Array.from(chartDataMap.entries())
            .map(([data, valor]) => ({ data, valor }))
            .reverse();

        return NextResponse.json({
            totalFaturado,
            leads,
            graficoVendas
        });

    } catch (error: any) {
        console.error('[STATS_ERROR]', error.message);
        return NextResponse.json({ error: 'Erro ao processar estatísticas.' }, { status: 500 });
    }
}
