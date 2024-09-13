import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        const updatedData = await request.json();

        const products: { id: number; title: string }[] = JSON.parse(fs.readFileSync('./database/category.json', 'utf-8'));

        const productIndex = products.findIndex((product) => product.id === id);

        if (productIndex === -1) {
            return NextResponse.json({ message: 'Sản phẩm không tồn tại.' }, { status: 404 });
        }
        const updatedProduct = { ...products[productIndex], ...updatedData };
        products[productIndex] = updatedProduct;


        fs.writeFileSync('./database/category.json', JSON.stringify(products), 'utf-8');

        return NextResponse.json(updatedProduct);
    } catch (error: any) {
        return NextResponse.json({ message: 'Có lỗi xảy ra trong quá trình cập nhật sản phẩm.', error: error.message }, { status: 500 });
    }
}