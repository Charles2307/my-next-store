"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function addProduct({ productName, price, category }) {
    const res = await  prisma.product.create({
        data: { productName, price, category },
    });
    revalidatePath("/products");

    return res;
}
export async function getProducts(){
    const res = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });
    return res;
}

export async function getProduct(id){
    return prisma.product.findUnique({
        where: { id: Number(id) },
    });
}