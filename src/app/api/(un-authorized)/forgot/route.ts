import JWT from '@/services/jwtService'
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { EmailSchema, PasswordSchema } from '@/useCases/forgotUseCase'

const prisma = new PrismaClient()
const jwt = new JWT()

export async function POST(req: NextRequest) {
  // get token and form data
  const data = await req.json()
  const token = req.cookies.get('token')?.value

  // check if token, email and password are sent
  if (!token) {
    return NextResponse.json(
      { error: 'No se ha enviado el token.' },
      { status: 400 },
    )
  }

  if (!data.email) {
    return NextResponse.json(
      { error: 'No se ha enviado el email.' },
      { status: 400 },
    )
  }

  if (!data.password) {
    return NextResponse.json(
      { error: 'No se ha enviado la nueva contraseña.' },
      { status: 400 },
    )
  }

  // verify token and get values
  const jwtToken = await jwt.verifyToken(token)

  // check if token is valid
  if (typeof jwtToken === 'string') {
    return NextResponse.json({ error: jwtToken }, { status: 401 })
  }

  if (
    jwtToken.email !== data.email ||
    jwtToken.type !== 'forgot' ||
    jwtToken.authorized == false
  ) {
    return NextResponse.json({ error: 'El token es invalido' }, { status: 401 })
  }

  // Check format of form body
  const checkEmail = EmailSchema.safeParse({ email: data.email })
  const checkPassword = PasswordSchema.safeParse({ password: data.password })

  if (!checkEmail.success) {
    return NextResponse.json(
      { response: checkEmail.error.errors[0].message },
      {
        status: 400,
      },
    )
  }

  if (!checkPassword.success) {
    return NextResponse.json(
      { response: checkPassword.error.errors[0].message },
      {
        status: 400,
      },
    )
  }

  // get user
  const user = await prisma.users.findFirst({
    where: { email: checkEmail.data.email, deleted: false },
  })

  // check if user exists
  if (!user) {
    return NextResponse.json(
      { error: 'No existe cuenta creada con ese correo' },
      { status: 404 },
    )
  }

  // Create new user
  const newUser = await prisma.users.update({
    where: { id: user.id },
    data: { password: checkPassword.data.password },
  })

  // generate autorized token with id
  const AuthoridedToken = jwt.generateAuthorizedToken(newUser.id)

  // generate and send response
  const response = NextResponse.json(
    { message: 'Se ha cambiado la contraseña' },
    { status: 201 },
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
