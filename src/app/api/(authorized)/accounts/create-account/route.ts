import JWT from '@/services/jwtService'
import { SignupForm } from '@/types'
import { SignUpSchema } from '@/useCases/signupUseCase'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

const jwt = new JWT()

export async function POST(req: Request) {
  const userData = await req.json()

  // Check format of request body
  const checkUserData = await SignUpSchema.safeParseAsync(
    userData as SignupForm,
  )
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
    { token: jwt.generateToken(newUser.id) },
    { status: 201 },
  )
}
