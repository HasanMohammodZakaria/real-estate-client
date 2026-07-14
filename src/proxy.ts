import { auth } from '@/app/lib/auth'
import { headers } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Route protection config
 * - PROTECTED_ROUTES: login required (any role)
 * - ADMIN_ROUTES: login + role === "admin" required
 */
const PROTECTED_ROUTES = ['/dashboard', '/properties/add', '/properties/manage']
const ADMIN_ROUTES = ['/dashboard/users', '/dashboard/admin-stats']

const LOGIN_PATH = '/login'

function matchesAny(pathname: string, routes: string[]) {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`))
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAdminRoute = matchesAny(pathname, ADMIN_ROUTES)
  const isProtectedRoute = isAdminRoute || matchesAny(pathname, PROTECTED_ROUTES)

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    const loginUrl = new URL(LOGIN_PATH, request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAdminRoute && session.user.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/properties/add', '/properties/manage'],
}