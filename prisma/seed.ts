import 'dotenv/config'
import { PrismaClient, ProductType } from '@prisma/client'

import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('Start seeding...')

    // Clear existing products to avoid duplicates if re-run (optional strategy)
    // await prisma.product.deleteMany() 

    const products = [
        {
            name: "Classic Wedding Board (Papan Bunga)",
            description: "Traditional floral board for weddings. Size 2x1m. Includes custom lettering.",
            price: 450000,
            image: "https://placehold.co/600x400/png?text=Wedding+Board",
            type: ProductType.BOARD_FLOWER,
            isAvailable: true,
            stock: 100,
        },
        {
            name: "Grand Opening Congratulatory Board",
            description: "Bold colors to stand out for business openings. Size 2x1.2m.",
            price: 500000,
            image: "https://placehold.co/600x400/png?text=Grand+Opening",
            type: ProductType.BOARD_FLOWER,
            isAvailable: true,
            stock: 100,
        },
        {
            name: "Deepest Sympathy Board",
            description: "Elegant and respectful condolences board. White and blue theme.",
            price: 450000,
            image: "https://placehold.co/600x400/png?text=Sympathy+Board",
            type: ProductType.BOARD_FLOWER,
            isAvailable: true,
            stock: 100,
        },
        {
            name: "Romantic Red Roses Bouquet",
            description: "Hand-tied bouquet of 20 fresh red roses with baby's breath.",
            price: 350000,
            image: "https://placehold.co/600x400/png?text=Red+Roses",
            type: ProductType.BOUQUET,
            isAvailable: true,
            stock: 50,
        },
        {
            name: "Graduation Sunflower Bouquet",
            description: "Bright sunflowers to celebrate success. Includes graduation doll.",
            price: 250000,
            image: "https://placehold.co/600x400/png?text=Graduation",
            type: ProductType.BOUQUET,
            isAvailable: true,
            stock: 50,
        },
        {
            name: "Luxury Standing Flower",
            description: "Premium standing arrangement for VIP events. Height 1.5m.",
            price: 850000,
            image: "https://placehold.co/600x400/png?text=Standing+Flower",
            type: ProductType.STANDING_FLOWER,
            isAvailable: true,
            stock: 20,
        },
    ]

    for (const product of products) {
        const createdProduct = await prisma.product.create({
            data: product,
        })
        console.log(`Created product with id: ${createdProduct.id}`)
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
