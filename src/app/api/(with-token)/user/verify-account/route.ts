import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { AuthorizationError, GenerateErrorResponse } from '@/services/errorService'
import JWT from '@/services/jwtService'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { messages } from '@/const/messages'

const jwt = new JWT()

export async function POST (request: NextRequest): Promise<NextResponse> {
  const { id } = await request.json()
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    const { id: idUser } = jwt.verifyToken(token)

    const data = await prisma.account.findUniqueOrThrow({
      where: {
        id: Number(id),
        deleted: false
      },
      select: {
        id: true
      }
    })

    if (data.id !== idUser) {
      throw new AuthorizationError(messages.noPermissions)
    }

    return NextResponse.json(ReasonPhrases.OK, { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
