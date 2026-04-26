import { z } from 'zod';
import { ProductType } from '@prisma/client';

export const createProductSchema = z.object({
  sellerId: z.string().min(1),
  categoryId: z.string().min(1),
  name: z.string().min(3),
  slug: z.string().min(3),
  description: z.string().min(10),
  productType: z.nativeEnum(ProductType),
  basePrice: z.number().positive(),
  isCustomizable: z.boolean().default(false),
});
