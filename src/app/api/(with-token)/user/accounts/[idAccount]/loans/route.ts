import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { GenerateErrorResponse } from '@/services/errorService'
import { StatusCodes } from 'http-status-codes'
import { BigIntToJson } from '@/utils'

export async function GET (request: NextRequest,
  { params: { idAccount } }: { params: { idAccount: string } }): Promise<NextResponse> {
  try {
    const data = await prisma.account.findUnique({
      where: {
        id: Number(idAccount)
      },
      select: {
        loans: {
          select: {
            id: true,
            amount: true,
            date_end: true,
            interest: true,
            date: true
          }
        }
      }
    })

    if (data === null) {
      return NextResponse.json({ message: 'No hay prestamos' }, { status: 204 })
    }

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
        date_end: new Date(String(dateEnd)),
        interest
      }
    })

    return NextResponse.json('Se ha creado exitosamente', { status: StatusCodes.CREATED })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
