import { PrismaClient } from '@prisma/client'
import { type NextRequest, NextResponse } from 'next/server'
import {
  GenerateErrorResponse,
  NotFoundError
} from '@/services/errorService'

const prisma = new PrismaClient()

// check if any account exist with that email
export async function POST (req: NextRequest): Promise<NextResponse> {
  const { email, dni, phoneNumber } = await req.json()

  try {
    const checkExist = await prisma.users.findFirst({
      where: {
        OR: [
          { email },
          { dni },
          { phoneNumber }
        ],
        deleted: false
      }
    })

    if (checkExist === undefined || checkExist === null) { throw new NotFoundError('No existe una cuenta creada con ese correo') }

    return NextResponse.json(
      {},
      { status: 200 }
    )
  } catch (e) {
    return GenerateErrorResponse(e)
  }
}
