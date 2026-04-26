import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  productName: z.string().min(3),
  category: z.string().min(2),
  keyMaterials: z.array(z.string()).default([]),
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { productName, category, keyMaterials } = parsed.data;
  const title = `${productName} | Luxury ${category} by FABRIXLY`;
  const description = `Shop ${productName} crafted with ${keyMaterials.join(', ') || 'premium fabrics'} on FABRIXLY.`;
  const keywords = [productName, category, ...keyMaterials, 'luxury fashion', 'fabrixly'];

  return NextResponse.json({ data: { title, description, keywords } });
}
