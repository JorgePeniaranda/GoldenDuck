import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { GenerateErrorResponse } from '@/services/errorService'
import { StatusCodes } from 'http-status-codes'
import JWT from '@/services/jwtService'

const jwt = new JWT()

export async function GET (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
): Promise<NextResponse> {
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    const { id: idUser } = jwt.verifyToken(token)

    const data = await prisma.session.findUniqueOrThrow({
      where: {
        id: Number(id),
        idUser: Number(idUser)
      },
      select: {
        id: true,
        ip: true,
        userAgent: true,
        date: true
      }
    })

    return NextResponse.json(data, { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
