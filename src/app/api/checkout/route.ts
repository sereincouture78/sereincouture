import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  const { cartId, customerId, shippingAddress } = await request.json();
  if (!cartId || !customerId || !shippingAddress) {
    return NextResponse.json({ error: 'cartId, customerId, and shippingAddress are required' }, { status: 400 });
  }

  const cart = await prisma.cart.findUnique({ where: { id: cartId }, include: { items: { include: { product: true } } } });
  if (!cart || cart.items.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }

  const subtotal = cart.items.reduce((sum, item) => sum + Number(item.product.basePrice) * item.quantity, 0);
  const total = subtotal;

  const order = await prisma.order.create({
    data: {
      orderNumber: `FBX-${Date.now()}`,
      customerId,
      subtotalAmount: subtotal,
      totalAmount: total,
      shippingAddress,
      items: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          productVariantId: item.productVariantId,
          quantity: item.quantity,
          unitPrice: item.product.basePrice,
          lineTotal: Number(item.product.basePrice) * item.quantity,
        })),
      },
      payments: {
        create: {
          provider: 'stripe',
          amount: total,
          status: 'PENDING',
        },
      },
    },
    include: { items: true, payments: true },
  });

  return NextResponse.json({ data: order, nextAction: 'redirect_to_stripe_checkout' }, { status: 201 });
}
