import { NextResponse } from "next/server";
import fs from 'fs';

export async function GET() {
    const products = JSON.parse(fs.readFileSync("./database/db.json", 'utf-8'))
    return NextResponse.json(products)
}

export async function POST(request: Request) {
    const data = await request.json()
    let products = JSON.parse(fs.readFileSync("./database/db.json", 'utf-8'));
    const maxId = products.length > 0 ? Math.max(...products.map((product: any) => product.id)) : 0;
    let newUser = {
        ...data,
        id: maxId + 1
    }
    products.push(newUser)
    // ghi file lại
    fs.writeFileSync("./database/db.json", JSON.stringify(products))
    return NextResponse.json(newUser)
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        let products = JSON.parse(fs.readFileSync("./database/db.json", 'utf-8'));
        const updatedProducts = products.filter((product: any) => product.id !== id);
        fs.writeFileSync("./database/db.json", JSON.stringify(updatedProducts), 'utf-8');
        return new Response(JSON.stringify({ message: 'Sản phẩm đã được xóa thành công.' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Có lỗi xảy ra trong quá trình xóa sản phẩm.', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

