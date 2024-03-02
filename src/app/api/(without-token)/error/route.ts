import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { GenerateErrorResponse } from '@/services/errorService'
import { StatusCodes } from 'http-status-codes'
import { messages } from '@/const/messages'
import { getRequestData } from '@/utils'

export async function POST (request: NextRequest): Promise<NextResponse> {
  try {
    const { name, message } = await getRequestData(request)

    await prisma.error.create({
      data: {
        name,
        message
      }
    })

    const response = NextResponse.json(
      { message: messages.created },
      { status: StatusCodes.CREATED }
    )
    return response
  } catch (e) {
    return GenerateErrorResponse(e)
  }
}
