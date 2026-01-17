const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // Configuração Inicial do Site
    const config = await prisma.siteConfig.upsert({
        where: { id: 1 },
        update: {},
        create: {
            heroTitle: 'Domine a Inteligência Artificial',
            heroDescription: 'Descubra os melhores prompts e guias para transformar sua produtividade.',
            primaryColor: '#8b5cf6', // Violet-500
            welcomeText: 'Biblioteca de Prompts Premium'
        },
    })

    console.log('Site Config seeded:', config)

    // Produtos de Exemplo
    const p1 = await prisma.product.create({
        data: {
            title: 'Pack de Prompts para Copywriting',
            description: 'Mais de 100 prompts testados para criar textos que convertem.',
            imageUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Copywriting+Prompts',
            price: 'R$ 29,90',
        },
    })

    const p2 = await prisma.product.create({
        data: {
            title: 'Guia Definitivo de Midjourney',
            description: 'Aprenda a gerar imagens hiper-realistas com nosso guia passo a passo.',
            imageUrl: 'https://placehold.co/600x400/ec4899/ffffff?text=Midjourney+Guide',
            price: 'R$ 49,90',
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
