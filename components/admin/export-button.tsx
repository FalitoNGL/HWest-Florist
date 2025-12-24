"use client"

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { format } from "date-fns";

interface ExportButtonProps {
    orders: any[];
}

export function ExportButton({ orders }: ExportButtonProps) {
    const handleExport = () => {
        const header = ["Order ID", "Date", "Status", "Recipient", "Address", "Items", "Before Price"];
        const rows = orders.map(o => [
            o.id,
            format(new Date(o.createdAt), 'yyyy-MM-dd HH:mm'),
            o.status,
            `"${o.recipientName}"`, // Quote to handle commas
            `"${o.deliveryAddress}"`,
            `"${o.items.map((i: any) => `${i.quantity}x ${i.productName || 'Item'}`).join(', ')}"`,
            o.totalAmount
        ]);

        const csvContent = [
            header.join(","),
            ...rows.map(r => r.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `orders_export_${format(new Date(), 'yyyy-MM-dd')}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export Monthly CSV
        </Button>
    );
}
