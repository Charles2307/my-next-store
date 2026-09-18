import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
}

export async function POST(request) {
    const body = await request.json();
    const newProduct = await prisma.product.create({
        data: {
            productName: body.productName,
            price: body.price,
            category: body.category,
        },
    });
    return NextResponse.json(newProduct, { status: 201 });
}