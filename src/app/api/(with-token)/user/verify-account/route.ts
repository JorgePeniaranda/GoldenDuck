import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import {
  AuthorizationError,
  GenerateErrorResponse
} from '@/services/errorService'
import JWT from '@/services/jwtService'
import { StatusCodes } from 'http-status-codes'
import { messages } from '@/const/messages'
import { getRequestData } from '@/utils'

const jwt = new JWT()

export async function POST (request: NextRequest): Promise<NextResponse> {
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    const { id } = await getRequestData(request)

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

    return new NextResponse(null, {
      status: StatusCodes.NO_CONTENT
    })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
