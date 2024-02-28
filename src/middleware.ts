import { jwtVerify } from 'jose'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { AuthorizationError, ErrorsHandler } from './services/errorService'
import { pathToRegexp } from 'path-to-regexp'

const AuthorizedURLs = pathToRegexp(['/dashboard', '/dashboard/:path*'])
const UnAuthorizedURLs = pathToRegexp(['/login', '/register', '/forgot'])
const PublicApi = pathToRegexp(['/api', '/api/login', '/api/user', '/api/code', '/api/code/:email*'])

export async function middleware (request: NextRequest): Promise<NextResponse> {
  const token = request.cookies.get('token')

  const { authorized } = await jwtVerify(
    String(token?.value),
    new TextEncoder().encode(process.env.JWT_SECRET)
  ).then(() => {
    return { authorized: true }
  }).catch(() => {
    return { authorized: false }
  })

  // If the user is authorized and the URL is not authorized, redirect to dashboard
  if (UnAuthorizedURLs.test(request.nextUrl.pathname) as boolean && authorized) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
  }

  // If the user is not authorized and the URL is authorized, redirect to login
  if (AuthorizedURLs.test(request.nextUrl.pathname) as boolean && !authorized) {
    const response = NextResponse.redirect(new URL('/login', request.nextUrl))
    response.cookies.delete('token')
    return response
  }

  // If api request, check if the user is authorized
  try {
    if (
      request.nextUrl.pathname.startsWith('/api') &&
      !(PublicApi.test(request.nextUrl.pathname) as boolean) &&
      !authorized
    ) {
      throw new AuthorizationError('No autorizado')
    }
  } catch (error) {
    const { code, message, status, type } = ErrorsHandler(error)
    return NextResponse.json(
      { type, code, message },
      { status }
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/',
    '/api/:path*',
    '/dashboard',
    '/dashboard/:path*',
    '/login',
    '/register',
    '/forgot'
  ]
}
