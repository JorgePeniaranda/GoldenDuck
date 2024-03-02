import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { GenerateErrorResponse } from '@/services/errorService'
import JWT from '@/services/jwtService'
import { BigIntToJson } from '@/utils'
import { StatusCodes } from 'http-status-codes'

const jwt = new JWT()

export async function GET (request: NextRequest): Promise<NextResponse> {
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    const { id } = jwt.verifyToken(token)

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
        deleted: false
      },
      select: {
        name: true,
        lastName: true,
        dni: true,
        email: true,
        phoneNumber: true,
        address: true,
        birthDate: true,
        sex: true,
        updatedAt: true,
        createdAt: true,
        role: true
      }
    })

    return NextResponse.json(BigIntToJson(user), { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
