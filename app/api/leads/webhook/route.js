import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
    try {
        const body = await request.json();

        // Verifica token de segurança (opcional, pode ser via header ou query)
        // const auth = request.headers.get('authorization');
        // if (auth !== 'Bearer zapscale_n8n_secret') return NextResponse.json({error: 'Unauthorized'}, {status: 401});

        // Validação básica
        if (!body.telefone && !body.email) {
            return NextResponse.json({ error: 'Telefone ou Email obrigatório' }, { status: 400 });
        }

        // Cria o Lead no banco
        const lead = await prisma.lead.create({
            data: {
                nome: body.nome || 'Cliente WhatsApp',
                email: body.email || null,
                telefone: body.telefone || null,
                origem: 'WhatsApp/N8N',
                mensagem: body.mensagem || 'Importado via automação',
                status_pagamento: 'Pendente',
                valor_venda: 0.0
            }
        });

        return NextResponse.json({ success: true, leadId: lead.id });
    } catch (error) {
        console.error('Erro no Webhook Lead:', error);
        return NextResponse.json({ error: 'Erro interno ao salvar lead' }, { status: 500 });
    }
}
