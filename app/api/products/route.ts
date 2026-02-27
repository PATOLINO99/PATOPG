import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Lista todos os produtos
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
    }
}

// POST: Cria um novo produto
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, description, imageUrl, price } = body;

        const newProduct = await prisma.product.create({
            data: {
                title,
                description,
                imageUrl,
                price,
            },
        });

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao criar produto' }, { status: 500 });
    }
}
