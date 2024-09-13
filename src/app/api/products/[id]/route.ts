import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';

// Hàm xử lý yêu cầu GET để lấy thông tin sản phẩm theo ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {

        const id = Number(params.id);

        const products: { id: number; productName: string; price: number; image: string; quantity: number }[] = JSON.parse(fs.readFileSync("./database/db.json", 'utf-8'));


        const product = products.find((product) => product.id === id);


        if (!product) {
            return NextResponse.json({ message: 'Sản phẩm không tồn tại.' }, { status: 404 });
        }


        return NextResponse.json(product);
    } catch (error: any) {
        return NextResponse.json({ message: 'Có lỗi xảy ra trong quá trình truy xuất sản phẩm.', error: error.message }, { status: 500 });
    }
}


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        const updatedData = await request.json();

        const products: { id: number; productName: string; price: number; image: string; quantity: number }[] = JSON.parse(fs.readFileSync('./database/db.json', 'utf-8'));

        const productIndex = products.findIndex((product) => product.id === id);

        if (productIndex === -1) {
            return NextResponse.json({ message: 'Sản phẩm không tồn tại.' }, { status: 404 });
        }
        const updatedProduct = { ...products[productIndex], ...updatedData };
        products[productIndex] = updatedProduct;

       
        fs.writeFileSync('./database/db.json', JSON.stringify(products), 'utf-8');

        return NextResponse.json(updatedProduct);
    } catch (error: any) {
        return NextResponse.json({ message: 'Có lỗi xảy ra trong quá trình cập nhật sản phẩm.', error: error.message }, { status: 500 });
    }
}