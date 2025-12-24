import { getProducts } from "@/app/actions/product";
import ShopClient from "./shop-client";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Belanja Bunga | HWest Florist Batam",
  description: "Belanja papan bunga, buket, dan standing flower premium di HWest Florist Batam. Tersedia berbagai pilihan untuk pernikahan, grand opening, dan momen spesial lainnya.",
  keywords: ["beli bunga batam", "papan bunga batam", "buket batam", "standing flower batam", "florist batam"],
  openGraph: {
    title: "Belanja Bunga Premium | HWest Florist Batam",
    description: "Temukan koleksi bunga premium untuk setiap momen spesial Anda.",
    type: "website",
    locale: "id_ID",
  },
  alternates: {
    canonical: "https://hwestflorist.shop/shop",
  },
};

export default async function ShopPage() {
  const { data: products } = await getProducts();
  const allProducts = products || [];

  return <ShopClient products={allProducts} />;
}

