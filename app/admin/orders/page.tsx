import { getOrders } from "@/app/actions/admin";
import { OrdersView } from "@/components/admin/orders-view";

export default async function OrdersPage() {
    const { data: orders } = await getOrders();

    return (
        <div className="flex flex-col h-full space-y-4 p-4 md:p-0">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">Manajemen Pesanan</h1>
            <OrdersView orders={orders || []} />
        </div>
    );
}
