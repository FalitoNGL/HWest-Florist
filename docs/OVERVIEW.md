# HWest Florist - Application Overview

## ringkasan
Aplikasi ini adalah **Platform Manajemen Enterprise (ERP Mini)** yang dirancang khusus untuk bisnis Florist (Bunga Papan & Buket). Aplikasi ini menangani seluruh siklus bisnis mulai dari katalog pelanggan, pemesanan, produksi, hingga pengiriman dengan bukti foto.

## Tech Stack
- **Framework**: Next.js 16.1 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **UI**: Tailwind CSS + Radix UI
- **Auth**: Custom Middleware (Cookie-based for Admin)
- **Integrations**: WhatsApp (Order Finalization), Resend (Email Notifications), UploadThing (Images)

## Core Features (Fitur Utama)

### 1. Customer Catalog & Ordering
- **Dynamic Forms**: Form pemesanan menyesuaikan dengan tipe produk.
  - *Board Flower*: Meminta `Greeting Type`, `Target Name`, `Sender Name`.
  - *Bouquet*: Meminta `Card Message`.
- **Hybrid Checkout Flow**: Data pesanan disimpan ke database untuk arsip, tetapi finalisasi transaksi dilakukan via **WhatsApp Redirect** dengan pesan yang sudah terformat otomatis.

### 2. Admin Dashboard
- **Dashboard Statistik**: Memantau total revenue, jumlah order, dan produk terlaris.
- **Order Management**: Melihat daftar pesanan masuk, status pembayaran, dan detail produksi.
- **Product Management**: Menambah dan mengedit katalog produk, harga, dan stok.

### 3. Production Workflow (Alur Produksi)
Sistem memiliki status order spesifik untuk florist:
- `PENDING_PAYMENT` -> `PAID`
- `DESIGN_DRAFT`: Tim produksi membuat sketsa (misal: di styrofoam).
- `WAITING_APPROVAL`: Draft dikirim ke customer (biasanya via WA manual saat ini) untuk cek typo.
- `IN_PRODUCTION`: Proses perangkai bunga.
- `READY_TO_SHIP`: Bunga selesai dirangkai.

### 4. Delivery Tracking (Pengiriman)
- **Driver Management**: Admin dapat menugaskan pengiriman (logic tersirat).
- **Proof of Delivery**: Status `COMPLETED` **wajib** menyertakan foto bukti penerimaan (`proofPhotoUrl`). Ini menggantikan surat jalan fisik.

## Application Flow (Alur Aplikasi)

### A. Customer Journey
1.  **Browse**: Customer membuka web, memilih kategori (Papan/Buket).
2.  **Order**: Mengisi form detail (Tanggal Kirim, Ucapan, Alamat).
3.  **Submit**: Klik pesan -> Data tersimpan di DB (Status `PENDING`) -> Email Notifikasi terkirim ke Admin.
4.  **Finalize**: Browser membuka WhatsApp ke nomor Admin dengan teks pesanan lengkap.

### B. Admin & Staff Journey
1.  **Login**: Masuk via `/login`.
2.  **Process Order**: Admin mengubah status manual dari `PENDING` ke `PAID` setelah cek mutasi rekening.
3.  **Production**: Tim mengupdate status ke `IN_PRODUCTION` saat mulai kerja.
4.  **Completion**:
    - Saat barang sampai, Admin/Kurir mengupload foto penerima.
    - Status berubah jadi `COMPLETED`.
    - Data tersimpan permanen di `Delivery` table.

## Roles
- **Customer**: Public access.
- **Admin**: Full access (Dashboard, Products, Orders).
- **Driver/Production**: Saat ini menggunakan akses Admin, namun sistem database sudah siap untuk role terpisah (`DRIVER`, `PRODUCTION`).
