import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { AuthorizationError, GenerateErrorResponse, NotFoundError } from '@/services/errorService'
import JWT from '@/services/jwtService'
import { role } from '@prisma/client'

const jwt = new JWT()

export async function GET (request: NextRequest): Promise<NextResponse> {
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    const { id } = jwt.verifyToken(token)

    // check if any account exist
    const user = await prisma.user.findFirst({
      where: {
        id,
        deleted: false
      },
      select: {
        role: true
      }
    })

    if (user === null) {
      throw new NotFoundError('No se encontró la cuenta')
    }

    if (user.role !== role.ADMIN && user.role !== role.SUPPORT) {
      throw new AuthorizationError('No autorizado')
    }

    const data = await prisma.error.findMany()

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
