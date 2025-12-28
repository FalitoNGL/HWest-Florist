import { getProducts } from "@/app/actions/product";
import { Button } from "@/components/ui/button";
import { ProductTable } from "@/components/admin/product-table";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function ProductsPage() {
    const { data: products } = await getProducts();

    return (
        <div className="flex flex-col h-full space-y-4 p-4 md:p-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">Daftar Produk</h1>
                <Link href="/admin/products/new">
                    <Button className="w-full sm:w-auto">
                        <Plus className="mr-2 h-4 w-4" /> Tambah Produk
                    </Button>
                </Link>
            </div>

            <ProductTable products={products || []} />
        </div>
    );
}
