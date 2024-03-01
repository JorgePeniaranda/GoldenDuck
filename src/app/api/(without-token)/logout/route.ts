import { NextResponse } from 'next/server'

const response = (): NextResponse => {
  const response = NextResponse.json(
    { message: 'Ha cerrado la sesión exitosamente' },
    { status: 200 }
  )

  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/'
  })

  return response
}

export const GET = response
export const POST = response
