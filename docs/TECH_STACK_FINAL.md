# Final Tech Stack - URL Shortener with SEO

## 📋 Executive Summary

This document defines the complete technology stack for the URL Shortener with SEO project, including all technical decisions, rationale behind each choice, and implementation guides.

**Date:** January 2026  
**Version:** 1.0  
**Architecture:** Full-Stack Monorepo

---

## 🎯 Chosen Stack

### 1. Main Framework

**Decision:** Next.js 14+ with App Router

**Technologies:**

- Next.js 14+
- React 18+
- TypeScript 5+
- Node.js 18+

**Rationale:**

- ✅ Native SSR for metadata injection (critical for SEO)
- ✅ Integrated API Routes (monorepo, no CORS)
- ✅ Metadata API designed for Open Graph tags
- ✅ Server Components + Client Components
- ✅ Team's previous experience with App Router
- ✅ End-to-end type-safety
- ✅ Excellent DX (Developer Experience)

**Alternatives considered:**

- ❌ Vite + React: SPA cannot inject metadata server-side
- ❌ Astro: Requires separate backend, more complexity

---

### 2. Database

**Decision:** PostgreSQL

**Hosting:** Supabase (free tier: 500MB)

**Rationale:**

- ✅ Data model is relational (Users → URLs → Metadata)
- ✅ Referential integrity with Foreign Keys
- ✅ UNIQUE constraints to prevent short_code collisions
- ✅ ACID transactions
- ✅ Efficient indexes for lookups
- ✅ Type-safety with Prisma
- ✅ Free hosting on Supabase

**Alternatives considered:**

- ❌ MongoDB: Doesn't leverage NoSQL advantages, loses referential integrity

**Schema:**

```sql
Users (id, email, name, createdAt)
  └─ 1:N → URLs (id, userId, shortCode, originalUrl, expiresAt, isActive)
              └─ 1:1 → Metadata (id, urlId, title, description, imageUrl)
```

---

### 3. ORM

**Decision:** Prisma

**Version:** ^5.0.0

**Rationale:**

- ✅ Extreme type-safety with TypeScript
- ✅ Declarative and intuitive schema
- ✅ Automatic migrations with CLI
- ✅ Prisma Studio for visual debugging
- ✅ Type-safe query builder
- ✅ Excellent Next.js integration
- ✅ Large community and documentation

**Alternatives considered:**

- ❌ TypeORM: Weaker type-safety, verbose decorators
- ❌ Drizzle: Smaller community, no GUI

---

### 4. Authentication

**Decision:** Clerk

**Plan:** Free tier (10,000 monthly active users)

**Rationale:**

- ✅ Pre-built UI (saves development time)
- ✅ Automatic email verification
- ✅ Password reset included
- ✅ 5-minute setup
- ✅ User management dashboard
- ✅ OAuth ready (Google, GitHub)
- ✅ Webhooks to sync with Prisma
- ✅ Generous free tier

**Alternatives considered:**

- ❌ NextAuth.js: Requires building UI, more manual setup
- ❌ Lucia: Very low-level, more work

**Prisma Integration:**

- Use Clerk webhooks to sync users
- Clerk ID as primary key in Users table
- Keep URLs in own database

---

### 5. Styling

**Decision:** Tailwind CSS + shadcn/ui

**Version:**

- Tailwind CSS ^3.4.0
- shadcn/ui latest

**Rationale:**

- ✅ Extremely fast development
- ✅ Responsive design with built-in breakpoints
- ✅ Dark mode with `dark:` prefix
- ✅ Tiny production bundle (tree-shaking)
- ✅ High-quality pre-made shadcn/ui components
- ✅ Clerk components use Tailwind (consistency)
- ✅ Large ecosystem and community

**Alternatives considered:**

- ❌ CSS Modules: Slower to develop
- ❌ Styled Components: Runtime overhead, declining trend

**shadcn/ui components to use:**

- Button, Card, Dialog, Form, Input, Table, Toast

---

### 6. Metadata Scraping

**Decision:** Cheerio + Axios

**Version:**

- cheerio ^1.0.0
- axios ^1.6.0

**Rationale:**

- ✅ Fast (< 1 second per URL)
- ✅ Lightweight (~500KB vs 300MB Puppeteer)
- ✅ Works with 99% of websites
- ✅ Easy to deploy in serverless
- ✅ Low execution cost
- ✅ Simple and familiar API (jQuery-like)

**Alternatives considered:**

- ❌ Puppeteer: Very slow (3-10s), heavy, difficult in serverless
- ❌ Metascraper: Overkill for simple use case

**How it works:**

1. HTTP request with Axios
2. Parse HTML with Cheerio
3. Extract Open Graph tags (`og:title`, `og:description`, `og:image`)
4. Fallback to standard meta tags
5. Resolve relative URLs

---

### 7. Deployment

**Decision:** Vercel + Supabase

**Costs:**

- Vercel: Free tier (100GB bandwidth/month)
- Supabase: Free tier (500MB database)
- **Total: $0/month** for MVP

**Rationale:**

- ✅ Zero-config deployment for Next.js
- ✅ Automatic CI/CD from GitHub
- ✅ Preview deployments per PR
- ✅ Global Edge Functions
- ✅ Automatic SSL/HTTPS
- ✅ Environment variables UI
- ✅ Clerk webhooks work out-of-the-box
- ✅ Generous free tier

**Alternatives considered:**

- ❌ Netlify: Next.js is a second-class citizen, requires plugin
- ❌ Railway: ~$10-15/month, not free
- ❌ Self-hosted: Manual DevOps, no CI/CD

---

## 📦 Complete Dependencies

### Dependencies (Production)

```json
{
  "dependencies": {
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@prisma/client": "^5.9.0",
    "@clerk/nextjs": "^4.29.0",
    "cheerio": "^1.0.0-rc.12",
    "axios": "^1.6.5",
    "zod": "^3.22.4",
    "react-hook-form": "^7.49.3",
    "@hookform/resolvers": "^3.3.4",
    "tailwindcss": "^3.4.1",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1",
    "lucide-react": "^0.316.0"
  }
}
```

### DevDependencies

```json
{
  "devDependencies": {
    "@types/node": "^20.11.5",
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "@types/cheerio": "^0.22.35",
    "typescript": "^5.3.3",
    "prisma": "^5.9.0",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.1.0",
    "prettier": "^3.2.4",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.33"
  }
}
```

---

## 🚀 Initial Setup

### 1. Run Migration

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 2. Configure Clerk

```typescript
// middleware.ts
import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: ["/", "/:shortCode", "/api/webhooks/clerk"]
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
```

---

## 📁 Folder Structure

```bash
url-shortener/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (app)/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   └── new/
│   │       └── page.tsx
│   ├── [shortCode]/
│   │   └── page.tsx           # ⭐ Metadata injection + redirect
│   ├── api/
│   │   ├── urls/
│   │   │   ├── route.ts       # GET, POST
│   │   │   └── [id]/
│   │   │       └── route.ts   # PUT, DELETE
│   │   ├── metadata/
│   │   │   └── route.ts       # POST - scrape metadata
│   │   └── webhooks/
│   │       └── clerk/
│   │           └── route.ts   # Clerk user sync
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── UrlCard.tsx
│   ├── UrlList.tsx
│   ├── CreateUrlForm.tsx
│   └── EditMetadataDialog.tsx
├── lib/
│   ├── db.ts                  # Prisma client
│   ├── metadata-scraper.ts    # Cheerio scraper
│   ├── utils.ts               # cn() helper
│   └── short-code-generator.ts
├── prisma/
│   └── schema.prisma
├── public/
├── .env.local
├── middleware.ts
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🔐 Environment Variables

### Development (.env.local)

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/urlshortener"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
CLERK_WEBHOOK_SECRET="whsec_..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Production (Vercel)

```bash
# Database (Supabase)
DATABASE_URL="postgresql://postgres:[password]@[host]:5432/postgres"

# Clerk (production keys)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."
CLERK_SECRET_KEY="sk_live_..."
CLERK_WEBHOOK_SECRET="whsec_..."

# App
NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"
```

---

## 🎯 Next Steps

1. ✅ Tech stack defined
2. ⏭️ Initial project setup
3. ⏭️ Implement Prisma schema
4. ⏭️ Configure Clerk
5. ⏭️ Develop metadata scraper
6. ⏭️ Create dashboard pages
7. ⏭️ Implement short code redirect
8. ⏭️ Deploy to Vercel

---

## 📚 Resources

### Official Documentation

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Clerk Docs](https://clerk.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Vercel Docs](https://vercel.com/docs)

### Helpful Tutorials

- Next.js App Router + Prisma
- Clerk with Next.js 14
- Metadata API for SEO
- Cheerio web scraping

---

**Document created:** January 31, 2026  
**Last updated:** January 31, 2026  
**Version:** 1.0 Final
