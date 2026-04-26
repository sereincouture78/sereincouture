# FABRIXLY Project Architecture

## 🧱 1) Project Architecture

FABRIXLY is designed as a modular Next.js 14 monorepo-style application with clear domain boundaries while still shipping as a single deployable unit on Vercel.

### High-Level Layers

1. **Presentation Layer (Next.js App Router + Tailwind + ShadCN + Framer Motion)**
   - Route groups by audience and domain:
     - `(public)` marketplace, storefronts, category/search, design marketplace.
     - `(auth)` login/register/forgot password.
     - `(dashboards)` role-based dashboards for admin/store owner/designer/consumer.
   - Server Components for SEO-first pages (catalog, product pages).
   - Client Components for interactive flows (cart, studio, try-on, analytics controls).

2. **Application Layer (Server Actions + API Routes)**
   - Domain services organized in `src/server/modules/*`:
     - auth, users, products, catalog, cart, checkout, orders, coupons, designs, dashboards, analytics, seo-ai, social-ai, whatsapp, accounting, affiliate, loyalty, subscriptions.
   - Shared business utilities:
     - RBAC guards
     - validation schemas (Zod)
     - error mapping
     - pagination/filter builders

3. **Data Layer (PostgreSQL + Prisma ORM)**
   - Multi-tenant vendor marketplace models with product approval and digital/physical goods.
   - Purchase lifecycle supports Stripe Checkout, webhooks, payment records, invoice metadata.
   - CRM/accounting/affiliate/loyalty models are first-class DB entities.

4. **Integration Layer (Adapters)**
   - Stripe adapter (`billing.provider.ts`) for checkout/subscriptions/invoices.
   - Cloudinary adapter (`media.provider.ts`) for upload/delete/transform.
   - WhatsApp adapter (`whatsapp.provider.ts`) supporting Meta Cloud and Twilio strategy.
   - AI provider abstraction (`ai.provider.ts`) for trend summaries, SEO generation, caption generation, outfit suggestions, photoshoot prompts.

5. **Automation Layer (Jobs + Event-Driven Workflows)**
   - Domain events: `order.created`, `cart.abandoned`, `payment.succeeded`, `product.approved`.
   - Queue-ready architecture (can run cron + background worker process):
     - scheduled WhatsApp campaigns
     - abandoned cart reminders
     - periodic trend analytics rollups
     - weekly accounting snapshots
     - SEO/social draft suggestions

### Security & Compliance

- NextAuth with credentials + Google OAuth + optional OTP extension.
- RBAC on all mutation/read-sensitive endpoints.
- Input validation using Zod on API edge.
- Webhook signature verification (Stripe/WhatsApp callbacks).
- Auditable records for approvals, payouts, and campaign sends.

### Data & Ownership Model

- `User` owns one role-specific profile (store owner, designer, etc.).
- Vendor-owned assets (products/designs) are logically isolated by owner IDs.
- `Product` supports both physical and digital sale modes.
- `OrderItem` links to product/variant/design asset and license data where relevant.

### Performance Design

- Cached catalog queries + indexed search columns.
- Edge-safe read routes for high-traffic catalog endpoints.
- Media optimization through Cloudinary transformed URLs.
- Incremental route segment loading and skeleton states.

---

## 📁 2) Folder & File Structure

```txt
fabrixly/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
│   ├── images/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx
│   │   │   ├── marketplace/
│   │   │   ├── products/[slug]/
│   │   │   ├── store/[slug]/
│   │   │   ├── design-marketplace/
│   │   │   └── try-on/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── verify-otp/
│   │   ├── (dashboards)/
│   │   │   ├── admin/
│   │   │   ├── store-owner/
│   │   │   ├── designer/
│   │   │   └── consumer/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── products/route.ts
│   │   │   ├── products/[id]/route.ts
│   │   │   ├── cart/route.ts
│   │   │   ├── checkout/route.ts
│   │   │   ├── webhooks/stripe/route.ts
│   │   │   ├── whatsapp/campaigns/route.ts
│   │   │   ├── analytics/trends/route.ts
│   │   │   └── ai/seo/route.ts
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/                       # shadcn ui primitives
│   │   ├── layout/
│   │   ├── marketplace/
│   │   ├── checkout/
│   │   ├── dashboards/
│   │   ├── design-studio/
│   │   ├── try-on/
│   │   ├── analytics/
│   │   └── motion/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── products/
│   │   ├── catalog/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── orders/
│   │   ├── designs/
│   │   ├── mockups/
│   │   ├── whatsapp/
│   │   ├── crm/
│   │   ├── accounting/
│   │   ├── affiliate/
│   │   ├── loyalty/
│   │   ├── subscriptions/
│   │   └── ai/
│   │
│   ├── server/
│   │   ├── db.ts
│   │   ├── auth/
│   │   │   ├── auth-options.ts
│   │   │   └── rbac.ts
│   │   ├── modules/
│   │   │   ├── users/
│   │   │   ├── products/
│   │   │   ├── cart/
│   │   │   ├── checkout/
│   │   │   ├── orders/
│   │   │   ├── dashboards/
│   │   │   ├── analytics/
│   │   │   ├── ai/
│   │   │   ├── whatsapp/
│   │   │   ├── accounting/
│   │   │   ├── affiliate/
│   │   │   └── loyalty/
│   │   ├── providers/
│   │   │   ├── stripe.provider.ts
│   │   │   ├── cloudinary.provider.ts
│   │   │   ├── whatsapp.provider.ts
│   │   │   └── ai.provider.ts
│   │   ├── queue/
│   │   │   ├── events.ts
│   │   │   └── jobs/
│   │   └── invoices/
│   │
│   ├── store/
│   │   ├── auth.store.ts
│   │   ├── cart.store.ts
│   │   ├── wishlist.store.ts
│   │   ├── design-studio.store.ts
│   │   └── dashboard-filters.store.ts
│   │
│   ├── lib/
│   │   ├── validations/
│   │   ├── constants/
│   │   ├── utils/
│   │   ├── formatters/
│   │   ├── charts/
│   │   └── exports/
│   │
│   ├── types/
│   └── styles/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

### Architectural Notes on Folder Decisions

- `features/*` keeps business logic grouped by domain, independent of route location.
- `server/modules/*` isolates backend services from UI, making API routes thin.
- `providers/*` ensures future API upgrades (Banuba/DeepAR, OpenAI, Twilio/Meta) without rewriting domain modules.
- `store/*` is dedicated to Zustand stores and avoids mixing with server logic.
- `tests/` mirrors runtime architecture for predictable coverage.
