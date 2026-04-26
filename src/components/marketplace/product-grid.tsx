'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cart.store';

type Product = {
  id: string;
  name: string;
  description: string;
  basePrice: string;
};

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const add = useCartStore((s) => s.addItem);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((json) => setProducts(json.data ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="mt-8 text-textMuted">Loading premium pieces...</p>;
  }

  if (products.length === 0) {
    return <p className="mt-8 text-textMuted">No approved products yet.</p>;
  }

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          key={p.id}
          className="rounded-xl border border-royalBlue/40 bg-cardBg p-4"
        >
          <h3 className="font-semibold">{p.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-textMuted">{p.description}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-gold">₹{p.basePrice}</span>
            <button
              onClick={() => add({ productId: p.id, quantity: 1 })}
              className="rounded-md bg-oliveGreen px-3 py-1 text-sm"
            >
              Add to Cart
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
