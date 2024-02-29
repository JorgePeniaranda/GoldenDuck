import JWT from '@/services/jwtService'
import { type NextRequest, NextResponse, userAgent } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { GenerateErrorResponse } from '@/services/errorService'

const prisma = new PrismaClient()
const jwt = new JWT()

export async function POST (request: NextRequest): Promise<NextResponse> {
  const { ua } = userAgent(request)
  const token = String(
    request.headers.get('token') ?? request.cookies.get('token')?.value
  )

  try {
    const { id } = jwt.verifyToken(token)

    // Create account for new user
    await prisma.session.create({
      data: {
        idUser: id,
        userAgent: ua
      }
    })

    // generate and send response
    const response = NextResponse.json(
      { message: 'Se ha registrado la sesión exitosamente' },
      { status: 201 }
    )
    return response
  } catch (e) {
    return GenerateErrorResponse(e)
  }
}
