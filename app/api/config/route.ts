import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
        return NextResponse.json({ error: 'Erro ao buscar configurações' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { features, faqs, id, ...data } = body;

        const updateData: any = {
            heroTitle: data.heroTitle,
            heroSubtitle: data.heroSubtitle,
            primaryColor: data.primaryColor,
            accentColor: data.accentColor,
            whatsappLink: data.whatsappLink,
            logoUrl: data.logoUrl,
            socialInstagram: data.socialInstagram,
            supportEmail: data.supportEmail,
            footerCopyright: data.footerCopyright,
            // Novos campos de preço
            planStarterPrice: parseFloat(data.planStarterPrice) || 0,
            planStarterOldPrice: data.planStarterOldPrice ? parseFloat(data.planStarterOldPrice) : null,
            planStarterFeatures: data.planStarterFeatures,
            planStarterCheckout: data.planStarterCheckout,
            planProPrice: parseFloat(data.planProPrice) || 0,
            planProOldPrice: data.planProOldPrice ? parseFloat(data.planProOldPrice) : null,
            planProFeatures: data.planProFeatures,
            planProCheckout: data.planProCheckout,
            // Novos campos de Anúncios e Marketing
            announcementActive: Boolean(data.announcementActive),
            announcementText: data.announcementText,
            announcementLink: data.announcementLink,
            announcementBgColor: data.announcementBgColor,
            facebookPixelId: data.facebookPixelId,
            googleAnalyticsId: data.googleAnalyticsId
        };

        const settings = await prisma.siteSettings.upsert({
            where: { id: 1 },
            update: updateData,
            create: { id: 1, ...updateData },
        });

        if (Array.isArray(features)) {
            await prisma.feature.deleteMany({ where: { siteSettingsId: 1 } });
            if (features.length > 0) {
                await prisma.feature.createMany({
                    data: features.map((f: any) => ({
                        title: f.title,
                        description: f.description,
                        icon: f.icon,
                        siteSettingsId: 1
                    }))
                });
            }
        }

        if (Array.isArray(faqs)) {
            await prisma.fAQItem.deleteMany({ where: { siteSettingsId: 1 } });
            if (faqs.length > 0) {
                await prisma.fAQItem.createMany({
                    data: faqs.map((f: any) => ({
                        question: f.question,
                        answer: f.answer,
                        siteSettingsId: 1
                    }))
                });
            }
        }

        const final = await prisma.siteSettings.findFirst({
            where: { id: 1 },
            include: { features: true, faqs: true }
        });

        return NextResponse.json(final);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Erro ao atualizar' }, { status: 500 });
    }
}
