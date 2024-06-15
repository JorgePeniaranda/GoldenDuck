import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { pathToRegexp } from 'path-to-regexp'
import { GETVerifySession } from './modules/authentication/api/check-session'

const withToken = pathToRegexp('/dashboard/:path*')
const withoutToken = pathToRegexp(['/login', '/register', '/forgot'])

export async function middleware (request: NextRequest): Promise<NextResponse> {
  const authorized = await GETVerifySession()

  // If the user is authorized and the URL is not authorized, redirect to dashboard
  if (withoutToken.test(request.nextUrl.pathname) && authorized) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
  }

  // If the user is not authorized and the URL is authorized, redirect to login
  if (withToken.test(request.nextUrl.pathname) && !authorized) {
    const response = NextResponse.redirect(new URL('/login', request.nextUrl))
    response.cookies.delete('token')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register', '/forgot']
}
