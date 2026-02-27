import { prisma } from '@/lib/prisma';
import LandingPageClient from './components/LandingPageClient';
import { Metadata } from 'next';

export const revalidate = 0;

async function getSettings() {
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
        return JSON.parse(JSON.stringify(settings));
    } catch (e) {
        return null;
    }
}

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSettings();
    return {
        title: settings?.heroTitle || "ZapScale - Automação Inteligente",
        description: settings?.heroSubtitle || "A solução definitiva de API Oficial.",
    };
}

export default async function Home() {
    const settings = await getSettings();
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });

    return (
        <LandingPageClient
            settings={settings}
            products={JSON.parse(JSON.stringify(products))}
        />
    );
}
