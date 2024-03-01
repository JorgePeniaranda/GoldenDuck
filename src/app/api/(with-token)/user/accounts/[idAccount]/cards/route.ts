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
        cards: {
          where: {
            deleted: false
          },
          select: {
            id: true,
            number: true,
            cvv: true,
            expiration: true
          }
        }
      }
    })

    return NextResponse.json(BigIntToJson(data.cards), { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function POST (request: NextRequest,
  { params: { idAccount } }: { params: { idAccount: string } }): Promise<NextResponse> {
  const { number, cvv, expiration } = await request.json()

  try {
    await prisma.card.create({
      data: {
        idAccount: Number(idAccount),
        number,
        cvv,
        expiration: new Date(String(expiration))
      }
    })

    return NextResponse.json('Se ha creado exitosamente', { status: StatusCodes.CREATED })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
