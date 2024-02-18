import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const AuthorizedURLs = ['/dashboard', '/dashboard/:path*']
const UnAuthorizedURLs = ['/login', '/register', '/forgot']

export async function middleware (request: NextRequest): Promise<NextResponse> {
  const token = request.cookies.get('token')

  if (UnAuthorizedURLs.includes(request.nextUrl.pathname) && typeof token?.value === 'string') {
    try {
      const { payload } = await jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.JWT_SECRET)
      )

      if ((payload.authorized as boolean) && payload.aud === 'dashboard') {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
      }
    } catch (error) {
      console.log(error)
    }
  } else if (AuthorizedURLs.includes(request.nextUrl.pathname)) {
    if (typeof token?.value === 'string') {
      try {
        const { payload } = await jwtVerify(
          token.value,
          new TextEncoder().encode(process.env.JWT_SECRET)
        )

        if (!(payload.authorized as boolean) || payload.aud !== 'dashboard') {
          return NextResponse.redirect(new URL('/login', request.nextUrl))
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/login',
    '/register',
    '/forgot'
  ]
}
