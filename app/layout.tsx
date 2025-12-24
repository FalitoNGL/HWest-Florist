import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackToTop } from "@/components/ui/back-to-top";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HWest Florist Batam | Papan Bunga & Buket Premium",
  description: "Florist terbaik di Batam. Pesan papan bunga dan buket premium untuk pernikahan, grand opening, dan momen spesial. Pengiriman cepat.",
  keywords: ["florist batam", "papan bunga batam", "buket batam", "toko bunga batam", "hwest florist"],
  openGraph: {
    title: "HWest Florist Batam - Papan Bunga & Buket Premium",
    description: "Florist terbaik di Batam. Pesan papan bunga dan buket premium untuk pernikahan, grand opening, dan momen spesial.",
    siteName: "HWest Florist Batam",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2A121F" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="HWest Florist" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${manrope.variable} antialiased bg-[#2A121F] text-white font-display`}
      >
        {/* Scroll Progress Bar */}
        <ScrollProgress />

        {/* Main Content */}
        {children}

        {/* Global UI Elements */}
        <WhatsAppButton />
        <BackToTop />
        <Toaster />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Florist",
              "name": "HWest Florist",
              "image": "https://hwestflorist.shop/og-image.jpg",
              "description": "Premium florist in Batam providing flower boards and bouquets.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Batam Centre",
                "addressLocality": "Batam",
                "addressRegion": "Kepulauan Riau",
                "postalCode": "29400",
                "addressCountry": "ID"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 1.1301,
                "longitude": 104.0529
              },
              "url": "https://hwestflorist.shop",
              "telephone": "+6282169512800",
              "priceRange": "$$"
            })
          }}
        />
      </body>
    </html>
  );
}


