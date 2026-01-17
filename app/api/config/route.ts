import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Recupera a configuração do site
export async function GET() {
    try {
        let config = await prisma.siteConfig.findFirst({
            where: { id: 1 }
        });

        if (!config) {
            // Fallback se não houver seed
            config = await prisma.siteConfig.create({
                data: {
                    heroTitle: "Título Padrão",
                    heroDescription: "Descrição padrão",
                    primaryColor: "#000000",
                    welcomeText: "Bem-vindo"
                }
            });
        }

        return NextResponse.json(config);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar configurações' }, { status: 500 });
    }
}

// PUT: Atualiza a configuração do site
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const config = await prisma.siteConfig.upsert({
            where: { id: 1 },
            update: {
                heroTitle: body.heroTitle,
                heroDescription: body.heroDescription,
                primaryColor: body.primaryColor,
                welcomeText: body.welcomeText,
            },
            create: {
                id: 1,
                heroTitle: body.heroTitle,
                heroDescription: body.heroDescription,
                primaryColor: body.primaryColor || '#000000',
                welcomeText: body.welcomeText || '',
            },
        });

        return NextResponse.json(config);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao atualizar configurações' }, { status: 500 });
    }
}
