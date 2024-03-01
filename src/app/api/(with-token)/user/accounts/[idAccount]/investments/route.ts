import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { GenerateErrorResponse } from '@/services/errorService'
import { StatusCodes } from 'http-status-codes'
import { BigIntToJson } from '@/utils'

export async function GET (request: NextRequest,
  { params: { idAccount } }: { params: { idAccount: string } }): Promise<NextResponse> {
  try {
    const data = await prisma.account.findUniqueOrThrow({
      where: {
        id: Number(idAccount)
      },
      select: {
        investments: {
          select: {
            id: true,
            amount: true,
            interest: true,
            dateEnd: true,
            date: true
          }
        }
      }
    })

    return NextResponse.json(BigIntToJson(data.investments), { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function POST (request: NextRequest,
  { params: { idAccount } }: { params: { idAccount: string } }): Promise<NextResponse> {
  const { amount, dateEnd, interest } = await request.json()

  try {
    await prisma.investment.create({
      data: {
        idAccount: Number(idAccount),
        amount,
        dateEnd: new Date(String(dateEnd)),
        interest
      }
    })

    return NextResponse.json('Se ha creado exitosamente', { status: StatusCodes.CREATED })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
