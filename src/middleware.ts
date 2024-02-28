import { jwtVerify } from 'jose'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import {
  AuthorizationError,
  GenerateErrorResponse
} from './services/errorService'
import { pathToRegexp } from 'path-to-regexp'

const AuthorizedURLs = pathToRegexp(['/dashboard', '/dashboard/:path*'])
const UnAuthorizedURLs = pathToRegexp(['/login', '/register', '/forgot'])
const PublicApi = pathToRegexp([
  '/api',
  '/api/login',
  '/api/user',
  '/api/code',
  '/api/code/:email*'
])

export async function middleware (request: NextRequest): Promise<NextResponse> {
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  const { authorized, id, email, dni } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET)
  )
    .then(({ payload: { id, email, dni } }) => {
      return { authorized: true, id, email, dni }
    })
    .catch(() => {
      return { authorized: false, id: null, email: null, dni: null }
    })

  // If the user is authorized and the URL is not authorized, redirect to dashboard
  if (
    (UnAuthorizedURLs.test(request.nextUrl.pathname) as boolean) &&
    authorized
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
  }

  // If the user is not authorized and the URL is authorized, redirect to login
  if (
    (AuthorizedURLs.test(request.nextUrl.pathname) as boolean) &&
    !authorized
  ) {
    const response = NextResponse.redirect(new URL('/login', request.nextUrl))
    response.cookies.delete('token')
    return response
  }

  // Check api requests
  if (
    request.nextUrl.pathname.startsWith('/api') &&
    !(PublicApi.test(request.nextUrl.pathname) as boolean)
  ) {
    try {
      // Validate if the user is authorized to access the api
      if (!authorized) {
        throw new AuthorizationError('No autorizado')
      }

      // If user send token with id, mail or dni, validate if is same in the token
      const {
        id: userId,
        email: userEmail,
        dni: userDni
      } = await request.json()
      if (typeof id === 'string' && id !== userId) {
        throw new AuthorizationError('No autorizado')
      }
      if (typeof email === 'string' && email !== userEmail) {
        throw new AuthorizationError('No autorizado')
      }
      if (typeof dni === 'string' && dni !== userDni) {
        throw new AuthorizationError('No autorizado')
      }
    } catch (error) {
      return GenerateErrorResponse(error)
    }
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
