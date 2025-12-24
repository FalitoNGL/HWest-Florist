"use client";

import Link from "next/link";
import { ArrowRight, Leaf, Star, Sparkles, MapPin, Phone, Menu, Quote, Instagram, Facebook, ShoppingBag, CreditCard, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TiltCard, HoloOverlay } from "@/components/ui/tilt-card";

// Scroll Reveal Hook
function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Reveal Component
const Reveal = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-out transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- COMPONENTS --- //

// 1. Noise Overlay Component
const NoiseOverlay = () => (
  <div
    className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
    }}
  />
);

// 2. Marquee Gallery Component
const MarqueeGallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1596662951482-0c4ba647b675?q=80&w=600&auto=format&fit=crop", // Wedding Board
    "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=600&auto=format&fit=crop", // Pink Rose Bouquet
    "https://images.unsplash.com/photo-1582794543139-8ac92a9abf30?q=80&w=600&auto=format&fit=crop", // Flower Stand
    "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=600&auto=format&fit=crop", // Sunflower
    "https://images.unsplash.com/photo-1599707367072-cd6ad65f3268?q=80&w=600&auto=format&fit=crop", // Elegant Stand
    "https://images.unsplash.com/photo-1563241527-3004b7be0ee0?q=80&w=600&auto=format&fit=crop", // Hand Bouquet
  ];

  return (
    <div className="py-12 bg-[#200D18] overflow-hidden border-t border-white/5 relative z-10">
      <div className="flex items-center gap-4 mb-8 justify-center">
        <Instagram className="w-5 h-5 text-[#FF2E93]" />
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-white/50">Follow Us @HWestFlorist</span>
      </div>
      <div className="flex w-full overflow-hidden mask-linear-fade">
        <div className="flex gap-4 animate-marquee whitespace-nowrap will-change-transform">
          {[...images, ...images, ...images].map((src, i) => (
            <div key={i} className="relative w-[250px] h-[250px] flex-shrink-0 rounded-2xl overflow-hidden hover:scale-95 transition-transform duration-500 cursor-pointer grayscale hover:grayscale-0 border border-white/5">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${src})` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 3. Testimonials Carousel
const Testimonials = () => {
  // Valid placeholder images for WhatsApp chats
  const chatImages = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop"
  ];

  return (
    <section className="py-32 px-4 relative z-10 bg-[#1A0B14]">
      <div className="container mx-auto">
        <Reveal className="mb-16 text-center">
          <span className="text-[#FF2E93] font-bold tracking-[0.2em] uppercase text-sm">Happy Clients</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-4">Love Notes from Batam</h2>
        </Reveal>

        {/* Flex Carousel with Snap */}
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {chatImages.map((src, i) => (
            <div key={i} className="flex-shrink-0 w-[300px] md:w-[400px] bg-white/5 border border-white/10 rounded-3xl p-6 snap-center flex flex-col gap-4 hover:border-[#FF2E93]/30 transition-colors">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF2E93] to-[#c026d3] flex items-center justify-center text-white font-bold text-lg font-serif">
                  {["A", "R", "S", "D"][i]}
                </div>
                <div>
                  <h4 className="text-white font-bold">Customer {i + 1}</h4>
                  <span className="text-xs text-white/50 block">Ordered via WhatsApp</span>
                </div>
                <Quote className="w-8 h-8 text-white/10 ml-auto" />
              </div>
              {/* Placeholder for WA Screenshot */}
              <div className="w-full h-[400px] bg-black/40 rounded-xl border border-white/5 flex flex-col items-center justify-center text-white/30 gap-2 relative overflow-hidden group">
                <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(${src})` }}>
                </div>
                <div className="relative z-10 bg-black/60 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                  <span className="text-sm font-medium text-white/80">Chat Screenshot {i + 1}</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 italic">"Thank you so much! The flowers were fresh and beautiful. My wife loved them!"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 4. How To Order (NEW)
const HowToOrder = () => (
  <section className="py-24 px-4 relative z-10 bg-[#361826] border-y border-white/5">
    <div className="container mx-auto">
      <Reveal className="mb-16 text-center">
        <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm">Mudah & Cepat</span>
        <h2 className="text-3xl md:text-5xl font-black text-white mt-4">Cara Pemesanan</h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: ShoppingBag, title: "1. Pilih Bunga", desc: "Pilih buket atau papan bunga favorit Anda dari katalog premium kami." },
          { icon: CreditCard, title: "2. Pembayaran Aman", desc: "Selesaikan pesanan dengan Transfer Bank atau E-Wallet." },
          { icon: Truck, title: "3. Pengiriman Cepat", desc: "Duduk manis, kami akan kirim pesanan Anda dengan cepat ke tujuan." }
        ].map((step, idx) => (
          <Reveal key={idx} delay={idx * 150} className="relative p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
            <div className="absolute top-4 right-4 text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors">0{idx + 1}</div>
            <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary rounded-2xl flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
              <step.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm">{step.desc}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (

    <div className="min-h-screen bg-[#2A121F] text-white font-display selection:bg-rose-500 selection:text-white relative overflow-x-hidden">
      {/* GLOBAL NOISE OVERLAY */}
      <NoiseOverlay />

      {/* Navbar with Glassmorphism 2.0 */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 py-4 transition-all duration-300",
        scrolled
          ? "bg-[#2A121F]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3"
          : "bg-transparent py-5"
      )}>
        <div className="flex items-center gap-2 relative z-50">
          <Image
            src="/logo-dark.png"
            alt="HWest Florist"
            width={180}
            height={50}
            className="h-10 w-auto"
            priority
          />
        </div>
        <div className="flex items-center gap-4 md:gap-8 bg-black/30 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 shadow-lg hover:border-white/20 transition-colors">
          <Link href="/shop" className="text-sm font-medium text-white/90 hover:text-[#FF2E93] transition-colors">Belanja</Link>
          <Link href="/about" className="text-sm font-medium text-white/90 hover:text-[#FF2E93] transition-colors hidden md:block">Tentang</Link>
          <Link href="/contact" className="text-sm font-medium text-white/90 hover:text-[#FF2E93] transition-colors">Kontak</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/shop">
            <Button className="rounded-full px-6 font-bold transition-transform active:scale-95 shadow-lg shadow-rose-500/20">
              Shop Now
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden z-50">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#2A121F]/95 backdrop-blur-xl border-white/10 text-white w-[300px]">
              <div className="flex flex-col gap-8 mt-12">
                <div className="flex flex-col gap-6 text-lg font-medium">
                  <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FF2E93] transition-colors">Shop</Link>
                  <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FF2E93] transition-colors">About</Link>
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FF2E93] transition-colors">Contact</Link>
                </div>
                <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent w-full" />
                <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full rounded-full font-bold">Shop Now</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden px-4 md:px-0 pt-24 pb-8">
        {/* Background */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2A121F]/80 via-transparent to-[#2A121F] z-10" />
          <div
            className="w-full h-full bg-cover bg-center animate-slow-zoom"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1531058240690-006c446962d8?q=80&w=2000&auto=format&fit=crop")' }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center max-w-5xl mx-auto space-y-6 md:space-y-8 animate-fade-in-up w-full">
          {/* Badge Removed by Request */}

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] drop-shadow-2xl">
            Papan Bunga & Buket <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E93] via-[#ff8cc6] to-[#c026d3] animate-gradient bg-300% filter drop-shadow-[0_0_20px_rgba(255,46,147,0.3)]">Premium Batam</span>
          </h1>
          <p className="max-w-xl text-base md:text-xl text-gray-200 font-light leading-relaxed drop-shadow-md mx-auto">
            Dirangkai khusus untuk momen spesial Anda. Pengiriman cepat dan kualitas terbaik di Batam.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
            <Link href="/shop" className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-300 rounded-full hover:scale-105 shadow-[0_0_30px_rgba(255,46,147,0.4)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E93] to-[#c026d3] group-hover:from-[#E01D83] group-hover:to-[#a21caf] transition-all" />
              <span className="relative z-10 flex items-center">
                Mulai Belanja <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link href="/order" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-300 border border-white/30 rounded-full hover:bg-white/10 backdrop-blur-sm hover:border-white/60">
              Pesan Langsung
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-20 flex-shrink-0 flex flex-col items-center gap-3 text-white/70 animate-float cursor-pointer hover:text-white transition-colors mt-4"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium hidden sm:block">Gulir untuk Menjelajah</span>
          <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-[#FF2E93] to-transparent"></div>
        </div>
      </section>

      {/* MARQUEE GALLERY SECTION */}
      <MarqueeGallery />

      {/* Featured Statistics / Value Props */}
      <section className="py-20 md:py-24 bg-[#200D18] relative z-10 border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2A121F] to-[#200D18] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <Reveal delay={0} className="space-y-4 md:space-y-6 py-6 md:py-8 px-4 group">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#FF2E93]/10 to-[#c026d3]/10 flex items-center justify-center mx-auto text-[#FF2E93] border border-[#FF2E93]/20 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(255,46,147,0.1)]">
                <Star className="w-8 h-8 md:w-10 md:h-10 fill-current" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#FF2E93] transition-colors">Top Rated Florist</h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-xs mx-auto">Trusted by 1000+ customers in Batam.</p>
            </Reveal>
            <Reveal delay={100} className="space-y-4 md:space-y-6 py-6 md:py-8 px-4 group">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#FF2E93]/10 to-[#c026d3]/10 flex items-center justify-center mx-auto text-[#FF2E93] border border-[#FF2E93]/20 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(255,46,147,0.1)]">
                <Leaf className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#FF2E93] transition-colors">Fresh from Garden</h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-xs mx-auto">Freshest premium flowers derived daily.</p>
            </Reveal>
            <Reveal delay={200} className="space-y-4 md:space-y-6 py-6 md:py-8 px-4 group">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#FF2E93]/10 to-[#c026d3]/10 flex items-center justify-center mx-auto text-[#FF2E93] border border-[#FF2E93]/20 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(255,46,147,0.1)]">
                <ArrowRight className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#FF2E93] transition-colors">Same Day Delivery</h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-xs mx-auto">Reliable express delivery in Batam.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 md:py-32 px-4 relative bg-[#2A121F] overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[#FF2E93]/10 rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#c026d3]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4 md:gap-6">
            <div className="space-y-2 md:space-y-4 text-center md:text-left">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E93] to-[#c026d3] font-bold tracking-[0.2em] uppercase text-xs md:text-sm border-l-0 md:border-l-4 border-[#FF2E93] pl-0 md:pl-4">Our Collections</span>
              <h2 className="text-3xl md:text-6xl font-black text-white leading-tight">Curated For You</h2>
            </div>
            <Link href="/shop" className="hidden md:flex items-center gap-2 group text-white font-medium hover:text-[#FF2E93] transition-colors text-lg">
              View All Products <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1 - Grand Boards */}
            <Reveal delay={0} className="h-full w-full">
              <TiltCard className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl border border-white/10 group bg-[#200D18]">
                <HoloOverlay />
                <Link href="/shop?category=BOARD_FLOWER" className="block h-full w-full">
                  <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                    <Image
                      src="https://images.unsplash.com/photo-1604323990536-e5452c0507c1?q=80&w=1000&auto=format&fit=crop"
                      alt="Grand Boards"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A121F] via-[#2A121F]/40 to-transparent opacity-90 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 transform translate-z-20">
                    <h3 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 text-white group-hover:text-[#FF2E93] transition-colors">Papan Bunga</h3>
                    <p className="text-gray-200 text-sm md:text-lg font-light mb-4 md:mb-8 opacity-90 md:opacity-90 transform translate-y-0 text-shadow">
                      Sempurna untuk pernikahan & pembukaan.
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black group-hover:bg-[#FF2E93] group-hover:text-white transition-colors">
                        <ArrowRight className="w-5 h-5 md:w-6 md:h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </span>
                      <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/80 group-hover:text-white">Beli Sekarang</span>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>

            {/* Card 2 - Bouquets */}
            <Reveal delay={100} className="h-full w-full lg:mt-16">
              <TiltCard className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl border border-white/10 group bg-[#200D18]">
                <HoloOverlay />
                <Link href="/shop?category=BOUQUET" className="block h-full w-full">
                  <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                    <Image
                      src="https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?q=80&w=1000&auto=format&fit=crop"
                      alt="Hand Bouquets"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A121F] via-[#2A121F]/40 to-transparent opacity-90 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 transform translate-z-20">
                    <h3 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 text-white group-hover:text-[#FF2E93] transition-colors">Buket Tangan</h3>
                    <p className="text-gray-200 text-sm md:text-lg font-light mb-4 md:mb-8 opacity-90 md:opacity-90">
                      Keindahan kompak untuk orang tersayang.
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black group-hover:bg-[#FF2E93] group-hover:text-white transition-colors">
                        <ArrowRight className="w-5 h-5 md:w-6 md:h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </span>
                      <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/80 group-hover:text-white">Beli Sekarang</span>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>

            {/* Card 3 - Standing Flowers */}
            <Reveal delay={200} className="h-full w-full">
              <TiltCard className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl border border-white/10 group bg-[#200D18]">
                <HoloOverlay />
                <Link href="/shop?category=STANDING_FLOWER" className="block h-full w-full">
                  <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                    <Image
                      src="https://images.unsplash.com/photo-1583228858294-6745cb25969e?q=80&w=1000&auto=format&fit=crop"
                      alt="Standing Flowers"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A121F] via-[#2A121F]/40 to-transparent opacity-90 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 transform translate-z-20">
                    <h3 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 text-white group-hover:text-[#FF2E93] transition-colors">Bunga Standing</h3>
                    <p className="text-gray-200 text-sm md:text-lg font-light mb-4 md:mb-8 opacity-90 md:opacity-90">
                      Tampilan elegan untuk acara resmi.
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black group-hover:bg-[#FF2E93] group-hover:text-white transition-colors">
                        <ArrowRight className="w-5 h-5 md:w-6 md:h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </span>
                      <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/80 group-hover:text-white">Beli Sekarang</span>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          </div>

          <div className="mt-12 md:mt-20 text-center md:hidden">
            <Link href="/shop">
              <Button variant="outline" className="rounded-full px-10 py-7 text-lg border-white/20 bg-white text-[#102216] w-full hover:bg-gray-200 hover:text-black transition-colors font-bold">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <Testimonials />

      {/* HOW TO ORDER (New) */}
      <HowToOrder />

      {/* LOCATION MAP SECTION */}
      <section className="py-24 px-4 relative z-10 bg-[#200D18]">
        <div className="container mx-auto">
          <Reveal className="mb-12 text-center">
            <span className="text-[#FF2E93] font-bold tracking-[0.2em] uppercase text-sm">Lokasi Kami</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-4">Kunjungi Toko Kami</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Temukan kami di Batam dan lihat langsung koleksi bunga segar kami</p>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Map Embed */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-[#FF2E93]/10 aspect-video lg:aspect-[4/3]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.1651010537103!2d103.96205267482874!3d1.0368035989532196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d98dab4d3efbc5%3A0xd93010d6d865da58!2sHWest%20Florist!5e0!3m2!1sid!2sid!4v1766548854808!5m2!1sid!2sid"
                  className="w-full h-full absolute inset-0"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Location Info */}
              <div className="space-y-8">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#FF2E93]/20 to-[#c026d3]/20 text-[#FF2E93] rounded-2xl flex items-center justify-center border border-[#FF2E93]/20 group-hover:scale-110 transition-transform">
                      <MapPin className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">HWest Florist Batam</h3>
                      <p className="text-gray-400 leading-relaxed">
                        Ruko Grand Batam, Blok B No. 12<br />
                        Batam, Kepulauan Riau, Indonesia
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#FF2E93]/20 to-[#c026d3]/20 text-[#FF2E93] rounded-2xl flex items-center justify-center border border-[#FF2E93]/20 group-hover:scale-110 transition-transform">
                      <Phone className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Hubungi Kami</h3>
                      <p className="text-gray-400 leading-relaxed">
                        WhatsApp: +62 821-6951-2800<br />
                        Buka Setiap Hari: 08:00 - 20:00 WIB
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=HWest+Florist+Batam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold text-white transition-all duration-300 rounded-full hover:scale-105 shadow-lg shadow-[#FF2E93]/20 overflow-hidden bg-gradient-to-r from-[#FF2E93] to-[#c026d3] hover:from-[#E01D83] hover:to-[#a21caf] group"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Buka di Google Maps
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Section - Fixed Background */}
      <section className="py-40 px-4 bg-[#2A121F] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E93]/20 to-[#c026d3]/20" />
        {/* Removed broken texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2A121F] via-transparent to-[#1F0E17] pointer-events-none" />


        <Reveal className="container mx-auto text-center relative z-10 space-y-10">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter max-w-4xl mx-auto leading-none text-white drop-shadow-2xl">
            Ready to Make Someone's <br /> Day <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E93] to-[#c026d3]">Special?</span>
          </h2>
          <p className="text-lg md:text-2xl font-medium max-w-2xl mx-auto text-gray-300">Hubungi kami sekarang dan temukan bunga sempurna untuk momen spesial Anda.</p>
          <Link href="/shop">
            <Button className="h-16 px-12 rounded-full text-xl bg-gradient-to-r from-[#FF2E93] to-[#c026d3] text-white hover:scale-105 transition-all shadow-2xl hover:shadow-[0_20px_40px_-15px_rgba(255,46,147,0.5)] border border-white/10">
              Start Shopping Now
            </Button>
          </Link>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="bg-[#1F0E17] pt-24 pb-12 border-t border-white/5 text-gray-400">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <span className="text-3xl font-bold text-white tracking-tight">HWest<span className="text-[#FF2E93]">.</span></span>
              <p className="text-sm leading-8 opacity-80">Bringing nature's elegance to your doorstep. The premier florist based in Batam, Indonesia, crafting memories one petal at a time.</p>
              {/* Social Media Links */}
              <div className="flex items-center gap-4 pt-4">
                <a
                  href="https://www.instagram.com/hwest_florist/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-[#FF2E93] hover:border-[#FF2E93] transition-all group"
                >
                  <Instagram className="w-5 h-5 text-white/70 group-hover:text-white" />
                </a>
                <a
                  href="https://www.facebook.com/eriano.bagsshop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-[#FF2E93] hover:border-[#FF2E93] transition-all group"
                >
                  <Facebook className="w-5 h-5 text-white/70 group-hover:text-white" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 tracking-wider uppercase text-sm">Shop</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="/shop" className="hover:text-[#FF2E93] transition-colors hover:translate-x-1 inline-block duration-200">All Products</Link></li>
                <li><Link href="/shop?category=BOARD_FLOWER" className="hover:text-[#FF2E93] transition-colors hover:translate-x-1 inline-block duration-200">Flower Boards</Link></li>
                <li><Link href="/shop?category=BOUQUET" className="hover:text-[#FF2E93] transition-colors hover:translate-x-1 inline-block duration-200">Hand Bouquets</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 tracking-wider uppercase text-sm">Company</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="#" className="hover:text-[#FF2E93] transition-colors hover:translate-x-1 inline-block duration-200">About Us</Link></li>
                <li><Link href="#" className="hover:text-[#FF2E93] transition-colors hover:translate-x-1 inline-block duration-200">Contact</Link></li>
                <li><Link href="/login" className="hover:text-[#FF2E93] transition-colors hover:translate-x-1 inline-block duration-200">Admin Login</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 tracking-wider uppercase text-sm">Contact</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3"><MapPin className="w-5 h-5 text-[#FF2E93] shrink-0 mt-0.5" /> <span className="opacity-80">Ruko Grand Batam, Blok B No. 12<br />Batam, Indonesia</span></li>
                <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-[#FF2E93] shrink-0" /> <span className="opacity-80">+62 821-6951-2800</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
            <p className="opacity-60">&copy; 2025 HWest Florist Batam. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a
                href="https://www.instagram.com/hwest_florist/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#FF2E93] transition-colors"
              >
                <Instagram className="w-4 h-4" /> Instagram
              </a>
              <a
                href="https://www.facebook.com/eriano.bagsshop"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#FF2E93] transition-colors"
              >
                <Facebook className="w-4 h-4" /> Facebook
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
