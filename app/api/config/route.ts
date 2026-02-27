import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

/**
 * GET: Busca configurações públicas
 * Aberto para alimentar a Landing Page
 */
export async function GET() {
    try {
        let settings = await prisma.siteSettings.findFirst({
            where: { id: 1 },
            include: { features: true, faqs: true }
        });

        if (!settings) {
            settings = await prisma.siteSettings.create({
                data: { id: 1 },
                include: { features: true, faqs: true }
            });
        }
        return NextResponse.json(settings);
    } catch (error) {
        console.error('[CONFIG_GET_ERROR]', error);
        return NextResponse.json({ error: 'Erro ao buscar configurações' }, { status: 500 });
    }
}

/**
 * PUT: Atualiza configurações
 * PRIVADO: Requer autenticação de admin
 */
export async function PUT(request: Request) {
    try {
        // --- 1. DEFESA EXTRA: Verificação de Token (Além do Middleware) ---
        const token = cookies().get('admin_token')?.value;
        const isAdmin = token && await verifyToken(token);

        if (!isAdmin) {
            return NextResponse.json({ error: 'Acesso negado. Apenas administradores podem alterar configurações.' }, { status: 403 });
        }

        const body = await request.json();

        // --- 2. SANITIZAÇÃO E VALIDAÇÃO DE ENTRADA ---
        const { features, faqs, id, ...data } = body;

        const parsePrice = (val: any) => {
            const num = parseFloat(String(val).replace(',', '.'));
            return isNaN(num) ? 0 : num;
        };

        const updateData: any = {
            heroTitle: String(data.heroTitle || '').substring(0, 200),
            heroSubtitle: String(data.heroSubtitle || '').substring(0, 500),
            primaryColor: String(data.primaryColor || '#10b981').match(/^#([A-Fa-f0-9]{3}){1,2}$/) ? data.primaryColor : '#10b981',
            accentColor: String(data.accentColor || '#06b6d4').match(/^#([A-Fa-f0-9]{3}){1,2}$/) ? data.accentColor : '#06b6d4',
            whatsappLink: String(data.whatsappLink || ''),
            logoUrl: String(data.logoUrl || ''),
            socialInstagram: String(data.socialInstagram || ''),
            supportEmail: String(data.supportEmail || ''),
            footerCopyright: String(data.footerCopyright || ''),

            // Preços (Sanitizados)
            planStarterPrice: parsePrice(data.planStarterPrice),
            planStarterOldPrice: data.planStarterOldPrice ? parsePrice(data.planStarterOldPrice) : null,
            planStarterFeatures: String(data.planStarterFeatures || ''),
            planStarterCheckout: String(data.planStarterCheckout || ''),

            planProPrice: parsePrice(data.planProPrice),
            planProOldPrice: data.planProOldPrice ? parsePrice(data.planProOldPrice) : null,
            planProFeatures: String(data.planProFeatures || ''),
            planProCheckout: String(data.planProCheckout || ''),

            // Marketing (IMPORTANTE: Higienizar tags de rastreio)
            announcementActive: Boolean(data.announcementActive),
            announcementText: String(data.announcementText || '').substring(0, 200),
            announcementLink: String(data.announcementLink || ''),
            announcementBgColor: String(data.announcementBgColor || '#10b981'),
            facebookPixelId: String(data.facebookPixelId || '').replace(/[^0-9]/g, ''), // Só números
            googleAnalyticsId: String(data.googleAnalyticsId || '').substring(0, 50)
        };

        const settings = await prisma.siteSettings.upsert({
            where: { id: 1 },
            update: updateData,
            create: { id: 1, ...updateData },
        });

        // 3. Atualizar relacionamentos (Transaction-like)
        if (Array.isArray(features)) {
            await prisma.feature.deleteMany({ where: { siteSettingsId: 1 } });
            if (features.length > 0) {
                await prisma.feature.createMany({
                    data: features.slice(0, 10).map((f: any) => ({ // Limite de 10 features
                        title: String(f.title || '').substring(0, 100),
                        description: String(f.description || '').substring(0, 200),
                        icon: String(f.icon || 'bolt').substring(0, 30),
                        siteSettingsId: 1
                    }))
                });
            }
        }

        if (Array.isArray(faqs)) {
            await prisma.fAQItem.deleteMany({ where: { siteSettingsId: 1 } });
            if (faqs.length > 0) {
                await prisma.fAQItem.createMany({
                    data: faqs.slice(0, 15).map((f: any) => ({ // Limite de 15 FAQs
                        question: String(f.question || '').substring(0, 200),
                        answer: String(f.answer || '').substring(0, 1000),
                        siteSettingsId: 1
                    }))
                });
            }
        }

        revalidatePath('/');
        return NextResponse.json({ success: true, message: 'Configurações salvas com segurança.' });

    } catch (error) {
        console.error('[CONFIG_PUT_ERROR]', error);
        return NextResponse.json({ error: 'Erro crítico ao atualizar configurações.' }, { status: 500 });
    }
}
