'use client';

import { authClient } from '@/app/lib/auth-client';


export function useAuth() {
  const { data: session, isPending, error } = authClient.useSession();

  return {
    session,
    user: session?.user ?? null,
    token: session?.session?.token ?? null,
    isLoggedIn: !!session,
    isAdmin: session?.user?.role === 'admin',
    isPending,
    error,
  };
}