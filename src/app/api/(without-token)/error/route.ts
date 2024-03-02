import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { GenerateErrorResponse } from '@/services/errorService'
import { StatusCodes } from 'http-status-codes'
import { getRequestData } from '@/utils'

export async function POST (request: NextRequest): Promise<NextResponse> {
  try {
    const { name, message } = await getRequestData(request)

    const newError = await prisma.error.create({
      data: {
        name,
        message
      },
      select: {
        id: true,
        name: true,
        message: true,
        date: true
      }
    })

    const response = NextResponse.json(
      newError,
      { status: StatusCodes.CREATED }
    )
    return response
  } catch (e) {
    return GenerateErrorResponse(e)
  }
}
