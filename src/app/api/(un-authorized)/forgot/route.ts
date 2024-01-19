import JWT from '@/services/jwtService'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { EmailSchema, PasswordSchema } from '@/useCases/forgotUseCase'

const prisma = new PrismaClient()
const jwt = new JWT()

export async function POST(req: Request) {
  // get token and form data
  const data = await req.json()

  // check if token, email and password are sent
  if (!data.token) {
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
  const jwtToken = await jwt.verifyToken(data.token)

  // check if token is valid
  if (typeof jwtToken === 'string') {
    return NextResponse.json({ error: jwtToken }, { status: 401 })
  }

  if (jwtToken.email !== data.email || jwtToken.type !== 'forgot') {
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
  return NextResponse.json({ token: newUser }, { status: 201 })
}
