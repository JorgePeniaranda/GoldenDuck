import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
// import { pathToRegexp } from 'path-to-regexp'

// const withToken = pathToRegexp('/dashboard/:path*')
// const withoutToken = pathToRegexp(['/login', '/register', '/forgot'])

export async function middleware (request: NextRequest): Promise<NextResponse> {
  // const token = String(
  //   request.headers.get('token') ?? request.cookies.get('token')?.value
  // )

  // Change to api call
  //
  // const { authorized, email, dni } = await jwtVerify(
  //   token,
  //   new TextEncoder().encode(process.env.JWT_SECRET)
  // )
  //   .then(({ payload: { email, dni } }) => {
  //     return { authorized: true, email, dni }
  //   })
  //   .catch(() => {
  //     return { authorized: false, email: null, dni: null }
  //   })

  // // If the user is authorized and the URL is not authorized, redirect to dashboard
  // if ((withoutToken.test(request.nextUrl.pathname) as boolean) && authorized) {
  //   return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
  // }

  // // If the user is not authorized and the URL is authorized, redirect to login
  // if ((withToken.test(request.nextUrl.pathname) as boolean) && !authorized) {
  //   const response = NextResponse.redirect(new URL('/login', request.nextUrl))
  //   response.cookies.delete('token')
  //   return response
  // }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
    '/login',
    '/register',
    '/forgot'
  ]
}
