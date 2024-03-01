import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { GenerateErrorResponse } from '@/services/errorService'
import { StatusCodes } from 'http-status-codes'
import { BigIntToJson } from '@/utils'

export async function GET (request: NextRequest,
  { params: { id, idAccount } }: { params: { id: string, idAccount: string } }): Promise<NextResponse> {
  try {
    const data = await prisma.investment.findUniqueOrThrow({
      where: {
        id: Number(id),
        idAccount: Number(idAccount)
      },
      select: {
        id: true,
        amount: true,
        date_end: true,
        interest: true,
        date: true
      }
    })

    return NextResponse.json(BigIntToJson(data), { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
