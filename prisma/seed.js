const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // Configuração Inicial do Site
    const settings = await prisma.siteSettings.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            heroTitle: 'Transforme seu WhatsApp em uma Máquina de Vendas 24h',
            heroSubtitle: 'Centralize seu time, elimine o risco de bloqueios e nunca mais deixe um cliente no vácuo.',
            primaryColor: '#10b981',
            accentColor: '#06b6d4',
            whatsappLink: 'https://wa.me/5500999999999',
            footerCopyright: '© 2024 ZapScale Tecnologia. Todos os direitos reservados.'
        },
    })

    console.log('Site Settings seeded:', settings)

    // Limpar e recriar produtos (opcional)
    await prisma.product.deleteMany({})

    const p1 = await prisma.product.create({
        data: {
            title: 'API Oficial WhatsApp',
            description: 'Conexão estável e segura sem risco de banimento.',
            imageUrl: 'https://placehold.co/600x400/10b981/ffffff?text=API+Oficial',
            price: 'R$ 197,00',
        },
    })

    const p2 = await prisma.product.create({
        data: {
            title: 'IA Treinada',
            description: 'Atendimento inteligente que aprende com seu negócio.',
            imageUrl: 'https://placehold.co/600x400/06b6d4/ffffff?text=IA+Treinada',
            price: 'R$ 397,00',
        },
    })

    console.log('Products seeded:', { p1, p2 })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
