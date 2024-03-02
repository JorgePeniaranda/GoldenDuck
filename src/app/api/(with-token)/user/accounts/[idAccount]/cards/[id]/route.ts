import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { GenerateErrorResponse } from '@/services/errorService'
import { StatusCodes } from 'http-status-codes'
import { BigIntToJson, getRequestData } from '@/utils'

export async function GET (
  request: NextRequest,
  { params: { id, idAccount } }: { params: { id: string, idAccount: string } }
): Promise<NextResponse> {
  try {
    const card = await prisma.card.findUniqueOrThrow({
      where: {
        id: Number(id),
        idAccount: Number(idAccount),
        deleted: false
      },
      select: {
        id: true,
        number: true,
        cvv: true,
        expiration: true
      }
    })

    return NextResponse.json(BigIntToJson(card), { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function PUT (
  request: NextRequest,
  { params: { idAccount, id } }: { params: { idAccount: string, id: string } }
): Promise<NextResponse> {
  try {
    const { number, cvv, expiration } = await getRequestData(request)

    const newCard = await prisma.card.update({
      where: {
        id: Number(id),
        idAccount: Number(idAccount)
      },
      data: {
        idAccount: Number(idAccount),
        number,
        cvv,
        expiration: new Date(String(expiration))
      },
      select: {
        id: true,
        number: true,
        cvv: true,
        expiration: true
      }
    })

    return NextResponse.json(BigIntToJson(newCard), { status: StatusCodes.OK })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}

export async function DELETE (
  request: NextRequest,
  { params: { id, idAccount } }: { params: { id: string, idAccount: string } }
): Promise<NextResponse> {
  try {
    await prisma.card.update({
      where: {
        id: Number(id),
        idAccount: Number(idAccount)
      },
      data: {
        deleted: true
      }
    })

    return new NextResponse(null, {
      status: StatusCodes.NO_CONTENT
    })
  } catch (error) {
    return GenerateErrorResponse(error)
  }
}
