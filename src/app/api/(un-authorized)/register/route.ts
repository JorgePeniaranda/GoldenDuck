import JWT from '@/services/jwtService'
import { NextResponse } from 'next/server'
import { SignupForm } from '@/types'
import { SignUpSchema } from '@/useCases/signupUseCase'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const jwt = new JWT()

export async function POST(req: Request) {
  // get token and form data
  const data = await req.json()

  // check if token and email are sent
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

  // verify token and get values
  const jwtToken = await jwt.verifyToken(data.token)

  // check if token is valid
  if (typeof jwtToken === 'string') {
    return NextResponse.json({ error: jwtToken }, { status: 401 })
  }

  if (jwtToken.email !== data.email || jwtToken.type !== 'register') {
    return NextResponse.json({ error: 'El token es invalido' }, { status: 401 })
  }

  // Check format of form body
  const checkUserData = await SignUpSchema.safeParseAsync(data as SignupForm)
  if (!checkUserData.success) {
    return NextResponse.json(
      { response: checkUserData.error.errors[0].message },
      {
        status: 400,
      },
    )
  }

  // Check if user already exists
  const checkSameUser = await prisma.users.findFirst({
    where: {
      OR: [
        { dni: checkUserData.data.dni },
        { email: checkUserData.data.email },
        { phoneNumber: checkUserData.data.phoneNumber },
      ],
      deleted: false,
    },
  })
  if (checkSameUser) {
    return NextResponse.json(
      { response: 'Ya existe un usuario con esos datos' },
      {
        status: 409,
      },
    )
  }

  // Create new user
  const newUser = await prisma.users.create({
    data: checkUserData.data,
  })
  return NextResponse.json(
    { token: jwt.generateAuthorizedToken(newUser.id) },
    { status: 201 },
  )
}
