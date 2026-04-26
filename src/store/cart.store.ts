import { create } from 'zustand';

type CartLine = {
  productId: string;
  quantity: number;
};

type CartState = {
  items: CartLine[];
  addItem: (line: CartLine) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (line) =>
    set((state) => {
      const existing = state.items.find((i) => i.productId === line.productId);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === line.productId ? { ...i, quantity: i.quantity + line.quantity } : i,
          ),
        };
      }
      return { items: [...state.items, line] };
    }),
  clear: () => set({ items: [] }),
}));
