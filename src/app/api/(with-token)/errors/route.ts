import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { AuthorizationError, GenerateErrorResponse } from '@/services/errorService'
import { role } from '@prisma/client'
import { checkRole } from '@/utils'
import { StatusCodes } from 'http-status-codes'

export async function GET (request: NextRequest): Promise<NextResponse> {
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    // check if user is authorized
    const authorized = await checkRole([role.ADMIN, role.SUPPORT], token).catch((error) => {
      throw error
    })
    if (!authorized) {
      throw new AuthorizationError('Permisos insuficientes')
    }

    // get errors
    const data = await prisma.error.findMany()

    return NextResponse.json(data, { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
