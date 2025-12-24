import { getProducts } from "@/app/actions/product";
import { Button } from "@/components/ui/button";
import { ProductTable } from "@/components/admin/product-table";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function ProductsPage() {
    const { data: products } = await getProducts();

    return (
        <div className="flex flex-col h-full space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Products</h1>
                <Link href="/admin/products/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                </Link>
            </div>

            <ProductTable products={products || []} />
        </div>
    );
}
