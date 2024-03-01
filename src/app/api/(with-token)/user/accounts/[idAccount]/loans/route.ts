import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { GenerateErrorResponse } from '@/services/errorService'
import { StatusCodes } from 'http-status-codes'
import { BigIntToJson } from '@/utils'
import { messages } from '@/const/messages'

export async function GET (request: NextRequest,
  { params: { idAccount } }: { params: { idAccount: string } }): Promise<NextResponse> {
  try {
    const data = await prisma.account.findUniqueOrThrow({
      where: {
        id: Number(idAccount)
      },
      select: {
        loans: {
          select: {
            id: true,
            amount: true,
            dateEnd: true,
            interest: true,
            date: true
          }
        }
      }
    })

    return NextResponse.json(BigIntToJson(data.loans), { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function POST (request: NextRequest,
  { params: { idAccount } }: { params: { idAccount: string } }): Promise<NextResponse> {
  const { amount, dateEnd, interest } = await request.json()

  try {
    await prisma.loan.create({
      data: {
        idAccount: Number(idAccount),
        amount,
        dateEnd: new Date(String(dateEnd)),
        interest
      }
    })

    return NextResponse.json(messages.created, { status: StatusCodes.CREATED })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
