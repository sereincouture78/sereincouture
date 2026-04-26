import { NextRequest } from 'next/server';
import { Role } from '@prisma/client';

export function getRoleFromRequest(request: NextRequest): Role | null {
  const role = request.headers.get('x-role');
  if (!role) return null;
  if (Object.values(Role).includes(role as Role)) return role as Role;
  return null;
}

export function requireRole(request: NextRequest, allowed: Role[]) {
  const role = getRoleFromRequest(request);
  if (!role || !allowed.includes(role)) {
    return { ok: false as const, status: 403, error: 'Forbidden' };
  }
  return { ok: true as const, role };
}
