import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const latest = await prisma.trendAnalytics.findMany({ take: 30, orderBy: { metricDate: 'desc' } });
  return NextResponse.json({ data: latest });
}
