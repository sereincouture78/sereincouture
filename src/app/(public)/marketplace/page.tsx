import { ProductGrid } from '@/components/marketplace/product-grid';

export default function MarketplacePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-semibold">Marketplace</h1>
      <p className="mt-2 text-textMuted">Search premium products by category, color, fabric, and size.</p>
      <ProductGrid />
    </main>
  );
}
