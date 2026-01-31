// Prisma Client Singleton for Next.js
// Prevents multiple instances in development (HMR)
// Compatible with Prisma 7.3.0

import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Create PostgreSQL adapter
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

// Global singleton pattern
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create or reuse Prisma Client instance
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

// In development, store on global to prevent hot-reload duplication
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
