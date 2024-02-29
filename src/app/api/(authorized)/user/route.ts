import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { GenerateErrorResponse } from '@/services/errorService'
import JWT from '@/services/jwtService'

const jwt = new JWT()

export async function GET (request: NextRequest): Promise<NextResponse> {
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    const { id } = jwt.verifyToken(token)

    // check if any account exist
    const data = await prisma.user.findFirst({
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
        role: true,
        account: true,
        sessions: true
      }
    })

    return NextResponse.json(json(data), { status: 200 })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

const json = (param: any): any => {
  return JSON.parse(
    JSON.stringify(
      param,
      (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
    )
  )
}
