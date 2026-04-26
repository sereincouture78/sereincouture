import { NextRequest, NextResponse } from 'next/server';
import { Role } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth/rbac';

export async function GET() {
  const campaigns = await prisma.whatsAppCampaign.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
  return NextResponse.json({ data: campaigns });
}

export async function POST(request: NextRequest) {
  const guard = requireRole(request, [Role.ADMIN, Role.STORE_OWNER, Role.BRAND]);
  if (!guard.ok) return NextResponse.json({ error: guard.error }, { status: guard.status });

  const body = await request.json();
  const campaign = await prisma.whatsAppCampaign.create({
    data: {
      createdById: body.createdById,
      name: body.name,
      templateName: body.templateName,
      payload: body.payload ?? {},
      targetTags: body.targetTags ?? [],
      provider: body.provider ?? 'meta',
    },
  });

  return NextResponse.json({ data: campaign }, { status: 201 });
}
