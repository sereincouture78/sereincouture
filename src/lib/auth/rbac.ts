import { Role } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';

type SessionUser = {
  id?: string;
  role?: Role;
};

export async function getRoleFromSession() {
  const session = await getServerSession(authOptions);
  const user = session?.user as SessionUser | undefined;

  if (!user?.role || !Object.values(Role).includes(user.role)) {
    return { role: null, userId: null };
  }

  return { role: user.role, userId: user.id ?? null };
}

export async function requireRole(allowed: Role[]) {
  const { role, userId } = await getRoleFromSession();

  if (!role) {
    return { ok: false as const, status: 401, error: 'Unauthorized' };
  }

  if (!allowed.includes(role)) {
    return { ok: false as const, status: 403, error: 'Forbidden' };
  }

  return { ok: true as const, role, userId };
}
