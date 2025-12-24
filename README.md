# HWest Florist

A premium, modern e-commerce application for HWest Florist in Batam, built with Next.js 15, Tailwind CSS, and Shadcn/UI.

## Features

### 🛍️ Customer Experience
- **Dynamic Catalog**: Browse Flower Boards and Bouquets with real-time availability.
- **Smart Order Form**: Dynamic fields based on product type (e.g., "Sender Name" for boards, "Card Message" for bouquets).
- **WhatsApp Integration**: Hybrid checkout flow that saves orders to DB and redirects to WhatsApp for payment.
- **Order Tracking**: Real-time status updates and photo proof of delivery.

### 🏢 **Admin Dashboard**
- **Kanban Board**: Visual drag-and-drop order management.
- **Product Management**: Full CRUD for products with image support.
- **Business Suite**: Revenue analytics, CSV export, and PDF invoice generation.
- **Operational Excellence**: Detailed order views and proof-of-delivery uploads.
- **Dynamic Settings**: Update store configuration (WhatsApp number) on the fly.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Shadcn/UI
- **Database**: Supabase (PostgreSQL) + Prisma ORM
- **State**: Zustand
- **Icons**: Lucide React

## Getting Started

1.  **Clone the repo**
    ```bash
    git clone https://github.com/your-username/hwest-florist.git
    cd hwest-florist/web
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    pnpm install
    # or
    yarn install
    ```

3.  **Setup Environment Variables**
    Copy `.env.example` to `.env` (or create one):
    ```env
    DATABASE_URL="postgresql://..."
    DIRECT_URL="postgresql://..."
    ADMIN_PASSWORD="admin123"
    NEXT_PUBLIC_WA_PHONE="6282169512800"
    ```

4.  **Run Migrations**
    ```bash
    npx prisma migrate dev
    ```

5.  **Start Development Server**
    ```bash
    npm run dev
    ```

## Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for full Vercel deployment instructions.
