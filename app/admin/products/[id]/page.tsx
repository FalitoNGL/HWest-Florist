
import { getProduct } from "@/app/actions/product";
import { ProductForm } from "@/components/admin/product-form";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { data: product } = await getProduct(id);

    if (!product) {
        notFound();
    }

    return <ProductForm mode="edit" initialData={product} />;
}
