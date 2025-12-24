import { getOrders } from "@/app/actions/admin";
import { OrdersView } from "@/components/admin/orders-view";

export default async function OrdersPage() {
    const { data: orders } = await getOrders();

    return (
        <div className="flex flex-col h-full space-y-4">
            <h1 className="text-2xl font-bold">Orders Management</h1>
            <OrdersView orders={orders || []} />
        </div>
    );
}
