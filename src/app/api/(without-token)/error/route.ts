import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { GenerateErrorResponse } from '@/services/errorService'
import { StatusCodes } from 'http-status-codes'
import { messages } from '@/const/messages'

export async function POST (request: NextRequest): Promise<NextResponse> {
  const { name, message } = await request.json()

  try {
    // Create account for new user
    await prisma.error.create({
      data: {
        name,
        message
      }
    })

    // generate and send response
    const response = NextResponse.json(
      { message: messages.created },
      { status: StatusCodes.CREATED }
    )
    return response
  } catch (e) {
    return GenerateErrorResponse(e)
  }
}
