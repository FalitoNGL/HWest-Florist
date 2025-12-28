'use server'

import { prisma } from "@/lib/prisma";
import { Product, ProductType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export type ProductFormData = {
    name: string;
    description?: string;
    price: number;
    image?: string;
    type: ProductType;
    isAvailable: boolean;
    stock: number;
}

export type SerializedProduct = Omit<Product, 'price'> & { price: number };

export async function getProducts() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' }
        });
        const serializedProducts: SerializedProduct[] = products.map(product => ({
            ...product,
            price: product.price.toNumber()
        }));
        return { success: true, data: serializedProducts };
    } catch (error) {
        console.error("Failed to get products:", error);
        return { success: false, error: "Failed to load products" };
    }
}

export async function getProduct(id: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { id }
        });

        if (!product) {
            return { success: false, error: "Product not found" };
        }

        const serializedProduct: SerializedProduct = {
            ...product,
            price: product.price.toNumber()
        };

        return { success: true, data: serializedProduct };
    } catch (error) {
        return { success: false, error: "Product not found" };
    }
}

export async function createProduct(data: ProductFormData) {
    try {
        await prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                image: data.image,
                type: data.type,
                isAvailable: data.isAvailable,
                stock: data.stock
            }
        });

        revalidatePath('/admin/products');
        revalidatePath('/catalog');
        return { success: true };
    } catch (error) {
        console.error("Create product error:", error);
        return { success: false, error: "Failed to create product" };
    }
}

export async function updateProduct(id: string, data: ProductFormData) {
    try {
        await prisma.product.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                image: data.image,
                type: data.type,
                isAvailable: data.isAvailable,
                stock: data.stock
            }
        });

        revalidatePath('/admin/products');
        revalidatePath('/catalog');
        return { success: true };
    } catch (error) {
        console.error("Update product error:", error);
        return { success: false, error: "Failed to update product" };
    }
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: { id }
        });

        revalidatePath('/admin/products');
        revalidatePath('/catalog');
        return { success: true };
    } catch (error) {
        console.error("Delete product error:", error);
        return { success: false, error: "Failed to delete product" };
    }
}

export async function duplicateProduct(id: string) {
    try {
        // Get the original product
        const original = await prisma.product.findUnique({
            where: { id }
        });

        if (!original) {
            return { success: false, error: "Produk tidak ditemukan" };
        }

        // Create a copy with "(Salinan)" appended to name
        const newProduct = await prisma.product.create({
            data: {
                name: `${original.name} (Salinan)`,
                description: original.description,
                price: original.price,
                image: original.image,
                type: original.type,
                isAvailable: original.isAvailable,
                stock: original.stock
            }
        });

        revalidatePath('/admin/products');
        revalidatePath('/catalog');
        return { success: true, data: { id: newProduct.id } };
    } catch (error) {
        console.error("Duplicate product error:", error);
        return { success: false, error: "Gagal menduplikat produk" };
    }
}
