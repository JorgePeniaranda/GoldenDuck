import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { AuthorizationError, GenerateErrorResponse, NotFoundError } from '@/services/errorService'
import JWT from '@/services/jwtService'

const jwt = new JWT()

export async function POST (request: NextRequest): Promise<NextResponse> {
  const { id } = await request.json()
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    const { id: idUser } = jwt.verifyToken(token)

    const data = await prisma.account.findFirst({
      where: {
        id: Number(id),
        deleted: false
      },
      select: {
        id: true
      }
    })

    if (data === null) {
      throw new NotFoundError('Cuenta no encontrada')
    }

    if (data.id !== idUser) {
      throw new AuthorizationError('Permisos insuficientes')
    }

    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
