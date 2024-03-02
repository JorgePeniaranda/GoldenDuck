import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { GenerateErrorResponse } from '@/services/errorService'
import { role } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'

export async function GET (request: NextRequest): Promise<NextResponse> {
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    // check if user is authorized
    await prisma.user.verifyRoleOrThrow([role.ADMIN], token).catch((error) => {
      throw error
    })

    const errors = await prisma.error.findMany({
      select: {
        id: true,
        name: true,
        message: true,
        date: true
      }
    })

    return NextResponse.json(errors, { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
