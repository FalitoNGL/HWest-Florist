"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/mobile/bottom-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { trackOrder } from "@/app/actions/track"
import { Search, Package, MapPin, CheckCircle, Clock } from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"

export default function TrackPage() {
    const [orderId, setOrderId] = useState("")
    const [order, setOrder] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setOrder(null)

        const res = await trackOrder(orderId.trim())

        if (res.success) {
            setOrder(res.data)
        } else {
            setError(res.error || "Failed to find order")
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-[#2A121F] flex flex-col font-sans text-white pb-24">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-8 max-w-xl">
                <div className="text-center mb-8 space-y-2">
                    <h1 className="text-3xl font-bold font-serif text-white mb-2">Lacak Pesanan</h1>
                    <p className="text-gray-300">Masukkan ID Pesanan untuk melihat status terkini.</p>
                </div>

                <Card className="mb-8 bg-[#200D18] border-white/10 shadow-xl">
                    <CardContent className="pt-6">
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <Input
                                placeholder="ID Pesanan (contoh: 123e4567...)"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                className="font-mono text-sm bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#FF2E93]"
                            />
                            <Button type="submit" disabled={loading} className="bg-gradient-to-r from-[#FF2E93] to-[#c026d3] text-white hover:opacity-90 border-none transition-all">
                                {loading ? <Clock className="animate-spin h-4 w-4" /> : <Search className="h-4 w-4" />}
                            </Button>
                        </form>
                        {error && <p className="text-red-400 text-sm mt-3 text-center bg-red-900/20 py-2 rounded-lg border border-red-500/20">{error}</p>}
                    </CardContent>
                </Card>

                {order && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
                        {/* Status Card */}
                        <Card className="bg-[#200D18] border-white/10 overflow-hidden">
                            <CardHeader className="bg-[#FF2E93]/10 pb-4 border-b border-white/5">
                                <CardTitle className="flex justify-between items-center text-[#FF2E93]">
                                    <span>Status</span>
                                    <span className="text-lg font-bold tracking-wider uppercase">{order.status.replace(/_/g, " ")}</span>
                                </CardTitle>
                                <CardDescription className="text-gray-400">Terakhir update: {format(new Date(order.updatedAt), 'PPP p')}</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/5 p-2 rounded-full text-[#c026d3]">
                                        <Package className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-sm text-gray-200">Penerima</h4>
                                        <p className="text-gray-400 text-sm">{order.recipientName}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/5 p-2 rounded-full text-[#c026d3]">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-sm text-gray-200">Alamat Tujuan</h4>
                                        <p className="text-gray-400 text-sm">{order.deliveryAddress}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Proof of Delivery */}
                        {order.status === 'COMPLETED' && order.delivery?.proofPhotoUrl && (
                            <Card className="overflow-hidden border-[#FF2E93]/30 shadow-lg shadow-rose-500/10 bg-[#200D18]">
                                <CardHeader className="bg-gradient-to-r from-[#FF2E93]/20 to-[#c026d3]/20 border-b border-white/10 py-3">
                                    <CardTitle className="text-white flex items-center gap-2 text-base">
                                        <CheckCircle className="h-5 w-5 text-[#FF2E93]" /> Berhasil Terkirim
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="relative aspect-video w-full bg-black/50">
                                        <Image
                                            src={order.delivery.proofPhotoUrl}
                                            alt="Bukti Pengiriman"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="p-4 text-center text-xs text-gray-400">
                                        Bukti pengiriman diambil oleh driver pada {order.delivery.arrivedTime ? format(new Date(order.delivery.arrivedTime), 'p') : 'Lokasi Tujuan'}.
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}
            </main>

            <BottomNav />
        </div>
    )
}
