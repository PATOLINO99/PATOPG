import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT: Atualiza um produto
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const { id } = params;

        // Extraindo apenas os campos permitidos
        const { title, description, imageUrl, price } = body;

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                title,
                description,
                imageUrl,
                price,
            },
        });

        return NextResponse.json(updatedProduct);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao atualizar produto' }, { status: 500 });
    }
}

// DELETE: Remove um produto
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        await prisma.product.delete({
            where: { id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao deletar produto' }, { status: 500 });
    }
}
