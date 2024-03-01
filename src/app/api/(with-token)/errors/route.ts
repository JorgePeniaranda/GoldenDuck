import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { AuthorizationError, GenerateErrorResponse } from '@/services/errorService'
import { role } from '@prisma/client'
import { checkRole } from '@/utils'

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
      throw new AuthorizationError('No autorizado')
    }

    // get errors
    const data = await prisma.error.findMany()

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
