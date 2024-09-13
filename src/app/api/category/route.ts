import { NextResponse } from "next/server";
import fs from 'fs';


export async function GET() {
    const categories = JSON.parse(fs.readFileSync("./database/category.json", 'utf-8'))
    return NextResponse.json(categories)
}

export async function POST(request: Request) {
    const data = await request.json()
    let categories = JSON.parse(fs.readFileSync("./database/category.json", 'utf-8'));
    const maxId = categories.length > 0 ? Math.max(...categories.map((product: any) => product.id)) : 0;
    let newUser = {
        ...data,
        id: maxId + 1
    }
    categories.push(newUser)
    // ghi file lại
    fs.writeFileSync("./database/category.json", JSON.stringify(categories))
    return NextResponse.json(newUser)
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        let categories = JSON.parse(fs.readFileSync("./database/category.json", 'utf-8'));
        const updatedCategories = categories.filter((product: any) => product.id !== id);
        fs.writeFileSync("./database/category.json", JSON.stringify(updatedCategories), 'utf-8');
        return new Response(JSON.stringify({ message: 'Danh mục đã được xóa thành công.' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Có lỗi xảy ra trong quá trình xóa danh mục.', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}




