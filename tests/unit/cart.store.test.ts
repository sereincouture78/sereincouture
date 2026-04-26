import { describe, expect, it } from 'vitest';
import { useCartStore } from '@/store/cart.store';

describe('cart.store', () => {
  it('adds items and merges quantities', () => {
    useCartStore.getState().clear();
    useCartStore.getState().addItem({ productId: 'p1', quantity: 1 });
    useCartStore.getState().addItem({ productId: 'p1', quantity: 2 });

    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(3);
  });
});
