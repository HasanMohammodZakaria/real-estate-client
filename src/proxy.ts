import { auth } from '@/app/lib/auth'
import { headers } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Route protection config
 * - PROTECTED_ROUTES: login required (any role)
 * - ADMIN_ROUTES: login + role === "admin" required
 */
const PROTECTED_ROUTES = ['/dashboard', '/items/add', '/items/manage']
const ADMIN_ROUTES = ['/dashboard/users', '/dashboard/admin-stats']

const LOGIN_PATH = '/login'

function matchesAny(pathname: string, routes: string[]) {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`))
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAdminRoute = matchesAny(pathname, ADMIN_ROUTES)
  const isProtectedRoute = isAdminRoute || matchesAny(pathname, PROTECTED_ROUTES)

  // Public route — no auth work needed at all
  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Full, DB-backed session validation (Next.js 16 proxy runs on Node.js by default,
  // so this is safe to call here — unlike the old Edge-only middleware)
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // Not logged in — send to login, remember where they were headed
  if (!session) {
    const loginUrl = new URL(LOGIN_PATH, request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Logged in, but trying to reach an admin-only route without the admin role
  if (isAdminRoute && session.user.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/items/add', '/items/manage'],
  runtime: 'nodejs', // explicit: getSession() needs DB access, not Edge
}