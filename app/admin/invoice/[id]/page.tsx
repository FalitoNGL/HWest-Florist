
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { notFound } from "next/navigation";

interface InvoicePageProps {
    params: Promise<{
        id: string;
    }>
}

export default async function InvoicePage({ params }: InvoicePageProps) {
    const { id } = await params;

    const order = await prisma.order.findUnique({
        where: { id },
        include: { items: true }
    });

    if (!order) notFound();

    return (
        <div className="min-h-screen bg-white p-8 md:p-16 print:p-0 font-serif text-black">
            <div className="max-w-3xl mx-auto border p-8 print:border-0">
                {/* Header */}
                <div className="flex justify-between items-start mb-8 border-b pb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">INVOICE</h1>
                        <p className="text-sm">HWest Florist Batam</p>
                        <p className="text-sm text-gray-500">Pasar STC, Blk. E No.10, Sagulung</p>
                        <p className="text-sm text-gray-500">Kota Batam, Kepulauan Riau 29439</p>
                        <p className="text-sm text-gray-500">+62 821-6951-2800</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-bold text-primary">HWest Florist</h2>
                    </div>
                </div>

                {/* Details */}
                <div className="flex justify-between mb-8">
                    <div>
                        <h3 className="font-bold text-sm mb-1 text-gray-500 uppercase">Bill To:</h3>
                        <p className="font-medium">{order.recipientName}</p>
                        <p className="text-sm">{order.deliveryAddress}</p>
                        <p className="text-sm">{order.recipientPhone}</p>
                    </div>
                    <div className="text-right">
                        <div className="mb-2">
                            <h3 className="font-bold text-sm mb-1 text-gray-500 uppercase">Invoice #</h3>
                            <p className="font-mono">{order.id.slice(0, 8).toUpperCase()}</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-sm mb-1 text-gray-500 uppercase">Date</h3>
                            <p>{format(new Date(order.createdAt), 'dd MMMM yyyy')}</p>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <table className="w-full mb-8">
                    <thead>
                        <tr className="border-b-2 border-black">
                            <th className="text-left py-2">Description</th>
                            <th className="text-right py-2">Qty</th>
                            <th className="text-right py-2">Price</th>
                            <th className="text-right py-2">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item: any) => (
                            <tr key={item.id} className="border-b border-gray-100">
                                <td className="py-2">
                                    <p className="font-medium">{item.productName || "Flower Item"}</p>
                                    <p className="text-xs text-gray-500">{item.greetingType || ""} {item.targetName ? `for ${item.targetName}` : ""}</p>
                                </td>
                                <td className="text-right py-2">{item.quantity}</td>
                                <td className="text-right py-2">{new Intl.NumberFormat('id-ID').format(Number(item.price))}</td>
                                <td className="text-right py-2 font-medium">{new Intl.NumberFormat('id-ID').format(Number(item.price) * item.quantity)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Totals */}
                <div className="flex justify-end mb-12">
                    <div className="w-1/2">
                        <div className="flex justify-between py-2 border-b">
                            <span className="font-bold">Total</span>
                            <span className="font-bold text-xl">Rp {new Intl.NumberFormat('id-ID').format(Number(order.totalAmount))}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-gray-500 mt-16 pt-8 border-t">
                    <p>Thank you for your business.</p>
                    <p>Payment due upon receipt.</p>
                </div>

                <div className="mt-8 text-center print:hidden">
                    <button
                        onClick={() => window.print()}
                        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                    >
                        Print Invoice
                    </button>
                    <script dangerouslySetInnerHTML={{ __html: `document.querySelector('button').addEventListener('click', () => window.print())` }} />
                </div>
            </div>
        </div>
    )
}
