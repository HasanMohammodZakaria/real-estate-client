import { auth } from '@/app/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getServerSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

export async function requireSession() {
  const session = await getServerSession();
  if (!session) {
    redirect('/login');
  }
  return session;
}

export async function requireAdminSession() {
  const session = await requireSession();
  if (session.user.role !== 'admin') {
    redirect('/dashboard');
  }
  return session;
}

/**
 * Server component-এ আসল JWT (jwt() plugin-এর token, session token না) বের করার জন্য।
 * Client-এর authClient.token() এর server-side equivalent — cookie forward করে
 * /api/auth/token endpoint hit করে প্রকৃত signed JWT আনে।
 */
export async function getServerToken(): Promise<string | null> {
  try {
    const incomingHeaders = await headers();
    const cookie = incomingHeaders.get('cookie') ?? '';

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/token`, {
      headers: { cookie },
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const data = await res.json();
    console.log('Server-side token fetch result:', data);
    return data?.token ?? null;
  } catch (error) {
    console.error('getServerToken failed:', error);
    return null;
  }
}