import { NextRequest, NextResponse } from 'next/server';
import { Role } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth/rbac';
import { createProductSchema } from '@/lib/validations/product';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const categoryId = searchParams.get('categoryId') || undefined;
  const take = Number(searchParams.get('take') || 24);

  const products = await prisma.product.findMany({
    where: {
      isPublished: true,
      approvalStatus: 'APPROVED',
      ...(categoryId ? { categoryId } : {}),
    },
    take,
    include: { variants: true, category: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ data: products });
}

export async function POST(request: NextRequest) {
  const guard = requireRole(request, [Role.ADMIN, Role.STORE_OWNER, Role.BRAND, Role.DESIGNER]);
  if (!guard.ok) return NextResponse.json({ error: guard.error }, { status: guard.status });

  const body = await request.json();
  const parsed = createProductSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: {
      ...parsed.data,
      basePrice: parsed.data.basePrice,
      mediaUrls: [],
      seoKeywords: [],
    },
  });

  return NextResponse.json({ data: product }, { status: 201 });
}
