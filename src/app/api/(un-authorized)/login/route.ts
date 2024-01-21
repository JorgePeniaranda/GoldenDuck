import JWT from '@/services/jwtService'
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const jwt = new JWT()

export async function POST(req: NextRequest) {
  const data = await req.json()

  if (!data.email) {
    return NextResponse.json(
      { error: 'No se ha enviado el email.' },
      { status: 400 },
    )
  }

  if (!data.password) {
    return NextResponse.json(
      { error: 'No se ha enviado la contraseña.' },
      { status: 400 },
    )
  }

  // get user
  const user = await prisma.users.findFirst({
    where: { email: data.email, deleted: false },
  })

  // check if user exists
  if (!user) {
    return NextResponse.json(
      { error: 'No existe cuenta creada con ese correo' },
      { status: 404 },
    )
  }

  // check password
  if (user.password !== data.password) {
    return NextResponse.json(
      { error: 'La contraseña es incorrecta' },
      { status: 401 },
    )
  }

  // generate autorized token with id
  const AuthoridedToken = jwt.generateAuthorizedToken(user.id)

  // generate and send response
  const response = NextResponse.json(
    { message: 'Ha ingresado exitosamente' },
    { status: 200 },
  )

  response.cookies.set('token', AuthoridedToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 30,
    path: '/',
  })

  return response
}
