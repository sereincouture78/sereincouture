# FABRIXLY — Production Foundation (Next.js 14 + Prisma + RBAC APIs)

## 🧱 1) Project Architecture
- Frontend: Next.js 14 App Router + Tailwind + Framer Motion + Zustand.
- Backend: Next.js Route Handlers with Zod validation.
- DB: PostgreSQL + Prisma models for marketplace, CRM, accounting, loyalty, affiliate, and subscriptions.
- Auth: NextAuth (Google + Credentials), RBAC guard utility for APIs.
- Integrations: Stripe / Cloudinary / WhatsApp env-ready placeholders.

Detailed architecture and full folder map: `docs/project-architecture.md`.

## 📁 2) Folder & File Structure
- `src/app` public pages, role dashboards, and API routes.
- `src/lib` prisma client, auth options, RBAC, and validation schemas.
- `src/components` reusable UI/domain components.
- `src/store` Zustand state stores.
- `prisma` schema + migration directory.
- `tests` unit/integration/e2e structure.

## 🧬 3) Prisma Schema
- Comprehensive models in `prisma/schema.prisma` with enums and required entities:
  `User`, `StoreOwnerProfile`, `BrandProfile`, `RetailerProfile`, `DesignerProfile`,
  `Product`, `ProductVariant`, `Category`, `FabricOption`, `ColorOption`, `SizeOption`, `Inventory`,
  `Cart`, `CartItem`, `Wishlist`, `Order`, `OrderItem`, `Payment`, `Coupon`,
  `CustomDesign`, `DesignLayer`, `DesignAsset`, `MockupRender`, `QuoteRequest`, `QuoteOffer`,
  `MessageThread`, `Message`, `TrendAnalytics`, `SeoSuggestion`, `SocialCampaignDraft`,
  `WhatsAppCampaign`, `CRMContact`, `AccountingReport`, `AffiliateLink`, `Referral`,
  `LoyaltyWallet`, `SubscriptionPlan`.

## 🔌 4) API Routes
Implemented route handlers:
- `GET/POST /api/products` (catalog list + vendor create with RBAC)
- `GET/PUT /api/cart` (retrieve/upsert cart items)
- `POST /api/checkout` (order creation from cart + payment placeholder)
- `GET /api/analytics/trends`
- `POST /api/ai/seo`
- `GET/POST /api/whatsapp/campaigns` (RBAC protected create)
- `GET/POST /api/auth/[...nextauth]`

## 🧑‍💻 5) Frontend Layout + Pages
Implemented pages:
- `/` home landing
- `/marketplace` product discovery grid
- `/admin`, `/store-owner`, `/designer`, `/consumer` dashboard shells

## 📦 6) UI Components
- `ProductGrid` with loading + empty states + Framer animation + add-to-cart actions.

## 🗃 7) State Management
- Zustand cart store in `src/store/cart.store.ts` with merge logic + clear actions.

## 🧪 8) Tests + Validation
- Unit test for cart store merge behavior: `tests/unit/cart.store.test.ts`.
- Zod validators for product creation and cart item upsert.

## ⚙️ 9) Setup & Deployment Guide
### Local setup
1. Install dependencies
   ```bash
   npm install
   ```
2. Copy envs
   ```bash
   cp .env.example .env
   ```
3. Generate Prisma client and run migration
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. Run app
   ```bash
   npm run dev
   ```

### Run tests
```bash
npm run test
```

### Deploy (Vercel)
1. Push repo to GitHub.
2. Import project in Vercel.
3. Configure environment variables from `.env.example`.
4. Add managed Postgres (Neon/Supabase/RDS) and set `DATABASE_URL`.
5. Run `prisma migrate deploy` in build/deploy pipeline.

## 📘 10) Feature Checklist (Current Status)
- [x] Core architecture blueprint
- [x] Comprehensive Prisma data model
- [x] Theme configuration and core App Router pages
- [x] Base RBAC utility and protected APIs
- [x] Marketplace list/create product flow
- [x] Cart + checkout order creation backend
- [x] NextAuth route and auth options scaffold
- [x] AI SEO + Trend + WhatsApp campaign API placeholders
- [x] Zustand cart state + unit test
- [ ] Stripe live checkout + webhook verification
- [ ] Cloudinary uploads + transformations
- [ ] Fabric.js design studio + VTO overlay pipeline
- [ ] Full admin/store/designer/consumer feature completion
- [ ] End-to-end purchase + post-purchase automation
