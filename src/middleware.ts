import { jwtVerify } from 'jose'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import {
  AuthorizationError,
  GenerateErrorResponse
} from './services/errorService'
import { pathToRegexp } from 'path-to-regexp'

const withToken = pathToRegexp(['/dashboard', '/dashboard/:path*'])
const withoutToken = pathToRegexp(['/login', '/register', '/forgot'])
const PublicApi = pathToRegexp([
  '/api',
  '/api/error',
  '/api/verify-user',
  '/api/code',
  '/api/code/:email*',
  '/api/login',
  '/api/logout'
])
const AccountsPath = pathToRegexp(['/api/user/accounts/:id*'])

export async function middleware (request: NextRequest): Promise<NextResponse> {
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  const { authorized, email, dni } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET)
  )
    .then(({ payload: { email, dni } }) => {
      return { authorized: true, email, dni }
    })
    .catch(() => {
      return { authorized: false, email: null, dni: null }
    })

  // If the user is authorized and the URL is not authorized, redirect to dashboard
  if (
    (withoutToken.test(request.nextUrl.pathname) as boolean) &&
    authorized
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
  }

  // If the user is not authorized and the URL is authorized, redirect to login
  if (
    (withToken.test(request.nextUrl.pathname) as boolean) &&
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

      // If user send token with mail or dni, validate if is same in the token
      if ((await request.clone().text()) !== '') {
        const userData = await request.json()
        if (
          (typeof email === 'string' || typeof userData.email === 'string') &&
          email !== userData.email
        ) {
          throw new AuthorizationError('Permisos insuficientes')
        }
        if (
          (typeof dni === 'string' || typeof userData.dni === 'string') &&
          dni !== userData.dni
        ) {
          throw new AuthorizationError('Permisos insuficientes')
        }
      }

      // validate if the user is owner of the account in /accounts/:id
      if (AccountsPath.test(request.nextUrl.pathname) as boolean) {
        const idAccount = AccountsPath.exec(request.nextUrl.pathname)?.[1].split('/')[0]
        await fetch('http://localhost:3000/api/user/verify-account/', {
          method: 'POST',
          body: JSON.stringify({ id: idAccount }),
          headers: { token }
        }).then(async (res) => {
          if (res.status !== 200) {
            throw new AuthorizationError('Permisos insuficientes')
          }
        }).catch((error) => {
          throw error
        })
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
