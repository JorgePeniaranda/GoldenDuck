import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { GenerateErrorResponse } from '@/services/errorService'
import { StatusCodes } from 'http-status-codes'
import { BigIntToJson } from '@/utils'

export async function GET (
  request: NextRequest,
  { params: { idAccount, id } }: { params: { idAccount: string, id: string } }
): Promise<NextResponse> {
  try {
    const investment = await prisma.investment.findUniqueOrThrow({
      where: {
        id: Number(id),
        idAccount: Number(idAccount)
      },
      select: {
        id: true,
        amount: true,
        dateEnd: true,
        interest: true,
        date: true
      }
    })

    return NextResponse.json(BigIntToJson(investment), {
      status: StatusCodes.OK
    })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
