import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { upsertCartItemSchema } from '@/lib/validations/cart';

export async function GET(request: NextRequest) {
  const cartId = request.nextUrl.searchParams.get('cartId');
  if (!cartId) return NextResponse.json({ error: 'cartId is required' }, { status: 400 });

  const cart = await prisma.cart.findUnique({ where: { id: cartId }, include: { items: { include: { product: true } } } });
  return NextResponse.json({ data: cart });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const parsed = upsertCartItemSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const payload = parsed.data;

  const item = await prisma.cartItem.upsert({
    where: {
      cartId_productId_productVariantId: {
        cartId: payload.cartId,
        productId: payload.productId,
        productVariantId: payload.productVariantId ?? null,
      },
    },
    create: {
      cartId: payload.cartId,
      productId: payload.productId,
      productVariantId: payload.productVariantId,
      quantity: payload.quantity,
    },
    update: {
      quantity: payload.quantity,
    },
  });

  return NextResponse.json({ data: item });
}
