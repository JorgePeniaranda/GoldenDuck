import { type NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import {
  GenerateErrorResponse
} from '@/services/errorService'

const prisma = new PrismaClient()

export async function POST (req: NextRequest): Promise<NextResponse> {
  const { name, message } = await req.json()

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
      { message: 'Se ha registrado el error exitosamente' },
      { status: 201 }
    )
    return response
  } catch (e) {
    return GenerateErrorResponse(e)
  }
}
