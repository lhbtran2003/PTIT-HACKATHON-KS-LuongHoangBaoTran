import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('name')?.toLowerCase() || '';

        const products: { id: number; productName: string; price: number; image: string; quantity: number }[] = JSON.parse(
            fs.readFileSync('./database/db.json', 'utf-8')
        );

        const filteredProducts = products.filter((product) =>
            product.productName.toLowerCase().includes(query)
        );

      
        return NextResponse.json(filteredProducts);
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Có lỗi xảy ra trong quá trình tìm kiếm sản phẩm.', error: error.message },
            { status: 500 }
        );
    }
}
