'use client';

import { useEffect, useState } from 'react';
import { authClient } from '@/app/lib/auth-client';

export function useAuth() {
  const { data: session, isPending } = authClient.useSession();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (!session) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setToken(null);
      return;
    }

    authClient.token().then(({ data }) => {
  
      setToken(data?.token ?? null);
    });
  }, [session]);

  return {
    session,
    user: session?.user ?? null,
    token,
    isLoggedIn: !!session,
    isAdmin: session?.user?.role === 'admin',
    isPending,
  };
}