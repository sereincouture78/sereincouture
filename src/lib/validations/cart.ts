import { z } from 'zod';

export const upsertCartItemSchema = z.object({
  cartId: z.string().min(1),
  productId: z.string().min(1),
  productVariantId: z.string().optional(),
  quantity: z.number().int().min(1).max(20),
});
